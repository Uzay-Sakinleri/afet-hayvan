import { QueryResult } from 'pg'
import { Animal } from '../interfaces/Animal';
import { Post } from '../interfaces/Post';
import pool from './pool';
import { Thumbnail } from '@interfaces/Thumbnail';


/**
 * Get animal object from the database
 * @param animalid ID of the animal to be returned
 * @returns Animal object if animalid exists, otherwise Error object
 */
export async function getAnimal(animalid: number): Promise<Animal | Error> {
    // Creating variables animal and query for storing animal and query variables
    const query = {
        text: 'SELECT * FROM animal WHERE animalid = $1',
        values: [animalid],
    };

    // Executing query for getting variables of the animal
    try {
        const result = await pool.query(query);
        const animal = result.rows[0] as Animal;
        return animal 
    } catch (error) {
        return error
    }
}

/**
 * Get post object from the database
 * @param postid ID of the post to be returned
 * @returns Post object if postid exists, otherwise Error object
 */
export async function getPost(postid: number): Promise<Post|Error> {
    // Creating variables post and query for storing post and query variables
    const query = {
        text: 'SELECT * FROM post WHERE postid = $1',
        values: [postid],
    };

    // Executing query for getting variables of the post
    try {
        const result = await pool.query(query);
        const animalid = result.rows[0].animalid;
        delete result.rows[0].animalid;
        const post = result.rows[0] as Post;
        const animal = await getAnimal(animalid) as Animal;
        post.animal = animal;
        return post;
    } catch (error) {
        return error
    }
}

/**
 * Get all the thumbnails from the database
 * @returns Returns list of Thumbnails in groups of nine
 */
export async function getAllThumbnails(): Promise<Thumbnail[][]> {
    // Create variable query for storing query variables
    const query = {
        text: 'SELECT postid, title, status, animalname, imagepath FROM post NATURAL JOIN animal',
    };

    // Executing query for getting thumbnails from posts
    try {
        let result = await pool.query(query);
        let thumbnails:Array<Array<Thumbnail>> = [];
        let i = 0;
        let new_array:Array<Thumbnail> = [];
        while (i < result.rowCount) {
            new_array.push(result.rows[i] as Thumbnail)
            if ((i + 1) % 9 == 0){
                thumbnails.push(new_array.slice());
                new_array = [];
            }
            i = i + 1
        }
        if ((result.rowCount + 1) % 9 != 0){
            thumbnails.push(new_array);
        }
        return thumbnails;
    } catch (error) {
        return error
    }
}

/**
 * a
 * @param animal a
 * @returns Returns true if animal is updated successfully, otherwise Error object
 */
export async function updateAnimal(animal: Animal): Promise<boolean> {
    // Create Pool in order to execute queries
    const query = {
        text: 'UPDATE animal SET animalname = $1, furcolor = $2, eyecolor = $3, accessory = $4, breed = $5, species = $6, imagePath = $7 WHERE animalID = $8',
        values: [animal.animalname, animal.furcolor, animal.eyecolor, animal.accessory, animal.breed, animal.species, animal.imagepath, animal.animalid],
    };
    
    // Executing query for updating the values of the animal with animalid
    try {
        await pool.query(query)
        return true
    } catch (error) {
        return error
    }
}

export async function updatePost(post: Post): Promise<boolean> {
    // Create Pool in order to execute queries
    const query = {
        text: 'UPDATE post SET userid = $1, title = $2, content = $3, completedat = $4, status = $5 WHERE postid = $6',
        values: [post.userid, post.title, post.content, post.completedat, post.status, post.postid],
    };

    // Executing query for updating the values of the post with postid
    try {
        await updateAnimal(post.animal)
        await pool.query(query)
        return true
    } catch (error) {
        return error
    }
}

export async function insertAnimal(animal: Animal): Promise<number | null> {

    // Create Pool in order to execute queries
    const query = {
        text: 'INSERT INTO animal (animalname, furcolor, eyecolor, accessory, breed, species, imagepath) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING animalid',
        values: [animal.animalname, animal.furcolor, animal.eyecolor, animal.accessory, animal.breed, animal.species, animal.imagepath]
    }
    
    // Executing query for inserting the new values of the animal
    try {
        let result = await pool.query(query);
        const animalid = result.rows[0].animalid;
        return animalid
    } catch (error) {
        return error
    }
}


/**
 * Inserts the input post into the database, on error returns null instead of postID.
 * @param {Post} post - The first parameter, a number.
 * @returns {Promise<number | null>} ID of the inserted post.
 */
export async function insertPost(post: Post): Promise<number | null> {
    // Creating variables for queries to be executed and postid to be returned
    const query = {
        text: 'INSERT INTO post (animalid, userid, title, content, status) VALUES ($1, $2, $3, $4, $5) RETURNING postid',
        values: [post.animal.animalid, post.userid, post.title, post.content, post.status],
    };

    try {
        await insertAnimal(post.animal)
        let result = await pool.query(query);
        const postid = result.rows[0].postid;
        return postid;
    } catch (error) {
        return error;
    }
}

export async function deleteAnimal(animalid: number) {
    const query = {
        text: 'DELETE FROM animal WHERE animalid = $1',
        values: [animalid]
    }

    try {
        await pool.query(query)
        return true
    } catch (error) {
        return error
    }
}