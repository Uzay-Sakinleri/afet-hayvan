import { QueryResult } from 'pg'
import { Animal } from '../interfaces/Animal';
import { Post } from '../interfaces/Post';
import pool from './pool';


/**
 * Get animal object from the database
 * @param animalid ID of the animal to be returned
 * @returns Animal object if animalid exists, otherwise Error object
 */
export async function getAnimal(animalid: number): Promise<Animal | Error> {
    // Creating variables animal and query for storing animal and query variables
    let animal:Animal;
    const query = {
        text: 'SELECT * FROM animals WHERE animalid = $1',
        values: [animalid],
    };

    // Executing query for getting variables of the animal
    try {
        let result = await pool.query(query);
        animal.animalID = animalid;
        animal.name = result.rows[0].name;
        animal.furColor = result.rows[0].furcolor;
        animal.eyeColor = result.rows[0].eyecolor;
        animal.breed = result.rows[0].breed;
        animal.species = result.rows[0].species;
        animal.accessory = result.rows[0].accessory;
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
    let post:Post;
    const query = {
        text: 'SELECT * FROM posts WHERE postid = $1',
        values: [postid],
    };

    // Executing query for getting variables of the post
    try {
        let result = await pool.query(query);
        let animal = await getAnimal(result.rows[0].animalid);
        post.postID = postid
        post.userID = result.rows[0].userID;
        post.title = result.rows[0].title;
        post.content = result.rows[0].content;
        post.createdAt = result.rows[0].createdAt;
        post.completedAt = result.rows[0].completedAt;
        post.status = result.rows[0].status;
        if (animal instanceof Error){
            return animal
        }
        else{ 
            post.animal = animal;
        }
        return post;
    } catch (error) {
        return error
    }
}

/**
 * Get all the thumbnails from the database
 * @returns Returns list of Thumbnails in groups of nine
 */
export async function getAllThumbnails(): Promise<QueryResult> {
    // Create variable query for storing query variables
    const query = {
        text: 'SELECT postid, posts.name AS title, animals.name AS animalName, animals.path AS imagePath, createdAt, completedAt, status FROM users NATURAL JOIN posts NATURAL JOIN animals',
    };

    // Executing query for getting thumbnails from posts
    try {
        let result = await pool.query(query);
        // TODO: Need to divide the result into groups of nine
        return result;
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
        text: 'UPDATE animals SET name = $1, furColor = $2, eyeColor = $3, accessory = $4, breed = $5, species = $6, imagePath = $7 WHERE animalID = $8',
        values: [animal.name, animal.furColor, animal.eyeColor, animal.accessory, animal.breed, animal.species, animal.imagePath, animal.animalID],
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
        text: 'UPDATE posts SET title = $1, completedAt = $2, status = $3 WHERE postid = $4',
        values: [post.title, post.completedAt,post.status],
    };

    // Executing query for updating the values of the post with postid
    try {
        await pool.query(query)
        return true
    } catch (error) {
        return error
    }
}

export async function insertAnimal(animal: Animal): Promise<number | null> {

    // Create Pool in order to execute queries
    const query = {
        text: 'INSERT INTO animals (name, furcolor, eyecolor, accessory, breed, species, imagepath) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING animalid',
        values: [animal.name, animal.furColor, animal.eyeColor, animal.breed, animal.species, animal.imagePath]
    }
    let animalid:number;
    
    // Executing query for inserting the new values of the animal
    try {
        let result = await pool.query(query);
        animalid = result.rows[0];
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
    let postid:number;
    const query = {
        text: 'INSERT INTO posts (animalid, userid, title, content, createdat, completedat, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING postid',
        values: [post.animal.animalID, post.userID, post.title, post.content, post.createdAt, post.completedAt, post.status],
    };

    // Executing query for inserting the new values into post 
    // TODO: Make this into a transaction since we want to make sure both animal and post is inserted
    try {
        let result = await pool.query(query);
        postid = result.rows[0].postid;
        return postid;
    } catch (error) {
        return error;
    }
}