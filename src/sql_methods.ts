import { Pool } from 'pg'
import { Animal } from './interfaces/Animal';
import { Post } from './interfaces/Post';
const pool = new Pool();

/**
 * @param { Number } animalid - Id of the animal to be returned
 * @returns Row values representing Animal interface with the given animalid
 */

async function getAnimal(animalid):Promise<Animal> {
    // Create Pool in order to execute queries
    let Animal:Animal;

    // Executing query for getting variables from row of animals
    pool.query('SELECT * FROM animals WHERE animalid = $1', [animalid], (err, res) => {
        if (err) {
            throw err;
        }
        animal.name = res.rows[0].name;
        animal.imagePath = res.rows[0].path;
        animal.appearance.appearanceId = res.rows[0].appearenceid;
        animal.breed.breedId = res.rows[0].breedid;
        animal.specie.specieId = res.rows[0].specieid;
    })

    // Executing query for getting variables from row of appearence
    pool.query('SELECT * FROM appearence WHERE appearence = $1', [animal.appearance.appearanceId], (err, res) => {
        if (err) {
            throw err;
        }
        animal.appearance.furColor.furColorId = res.rows[0].furcolorid;
        animal.appearance.eyeColor.eyeColorId = res.rows[0].eyecolorid;
        animal.appearance.accessory = res.rows[0].accessory;
    })

    // Executing query for getting variables from row of furcolors
    pool.query('SELECT * FROM furcolors JOIN eyecolors ON furcolorid = $1 AND eyecolorid = $2', [animal.appearance.furColor.furColorId, animal.appearance.eyeColor.eyeColorId], (err, res) => {
        if (err) {
            throw err;
        }
        animal.appearance.furColor.name = res.rows[0].furcolor;
        animal.appearance.furColor.name = res.rows[0].eyecolor;
    })

    // Executing query for getting variables from row of eyecolors
    pool.query('SELECT * FROM breeds JOIN species ON breedid = $1 AND specieid = $2', [animal.breed.breedId, animal.specie.specieId], (err, res) => {
        if (err) {
            throw err;
        }
        animal.breed.brName = res.rows[0].brname;
        animal.specie.speName = res.rows[0].spename;
    })
    pool.end();
    return animal as Animal;
}

/**
 * @param {Number} userid - Id of the user to be returned
 * @returns Row values representing User interface with the given userid
 */
async function getUser(userid) {
    // Create Pool in order to execute queries
    const { Pool } = require('pq');
    const pool = new Pool();
    const user = { userId: userid, name: '', surname: '', phone: 0, email: '', password: '', role: ''};

    // Executing query for getting variables from row of users
    pool.query('SELECT * FROM users WHERE userid = $1', [userid], (err, res) => {
        if (err) {
            throw err;
        }
        user.name = res.row[0].name;
        user.surname = res.row[0].surname;
        user.phone = res.row[0].phonenumber;
        user.email = res.row[0].email;
        user.password = res.row[0].password;
        user.role = res.row[0].role;
    })
    pool.end();
    return user;
}

/**
 * @param {Number} postid - Id of the post to be returned
 * @returns Row values representing Post interface with the given postid
 */

async function getPost(postid) {
    // Create Pool in order to execute queries
    const { Pool } = require('pq');
    const pool = new Pool();
    let userid = 0;
    let animalid = 0;
    let post:Post;

    // Executing query for getting variables from row of posts
    pool.query('SELECT * FROM posts WHERE postid = $1', [postid], (err, res) => {
        if (err) {
            throw err;
        }
        post.name = res.rows[0].name;
        userid = res.rows[0].userid;
        animalid = res.rows[0].animalid;
        post.createdAt = res.rows[0].createdat;
        post.completedAt = res.rows[0].completedat;
        post.status = res.rows[0].status;
    })
    pool.end();

    // Call on getUser and getAnimal to find respective user and animal of the post
    post.user = await getUser(userid)
    post.animal = await getAnimal(animalid)
    return post;
}

/**
 * @returns All the thumbnails of the posts in the main page
 */
async function getAllThumbnails() {
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()

    // Executing query for getting values from users, posts and animals related to thumbnail interface
    pool.query('SELECT postid, posts.name AS name, users.name AS username, animals.name AS animalname, animals.path AS imagePath, createdAt, completedAt, status FROM users NATURAL JOIN posts NATURAL JOIN animals', (err, res) => {
        if (err) {
            throw err;
        }
        pool.end();
        return res.rows
    })
}

async function updateUser(user){
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()
    const query = {
        text: 'UPDATE users SET name = $1, surname = $2, phonenumber = $3, email = $4, password = $5, role = $6 WHERE userid = $7',
        values: [user.name, user.surname, user.phone, user.email, user.password, user.role, user.userId],
    };

    // Executing query for updating the values of the user with userid
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('User with ID ${user.userId} updates with new values.');
        pool.end();
    })
}

async function updateAnimal(animal){
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()
    const query = {
        text: 'UPDATE animals SET name = $1, path = $2, breedid = $3, specieid = $4 WHERE animalid = $5',
        values: [animal.name, animal.imagePath, animal.breed.breedId, animal.specie.specieId, animal.animalId],
    };
    
    // TODO: need to make design decisions about how to handle furcolors, eyecolors, breeds and species to update
    // Executing query for updating the values of the animal with animalid
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Animal with ID ${animal.animalId} updates with new values.');
    })

    query.text = 'UPDATE appearences SET furcolorid = $1, eyecolorid = $2, accessory = $3 WHERE appearenceid = $4';
    query.values = [animal.appearance.furcolor.furColorId, animal.appearance.eyecolor.eyeColorId, animal.appearance.accessory, animal.appearance.appearanceId]

    pool.end();
}

async function updatePost(post){
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()
    const query = {
        text: 'UPDATE posts SET name = $1, completedAt = $2, status = $3 WHERE postid = $4',
        values: [post.name, post.completedAt,post.status, post.postId],
    };

    // Executing query for updating the values of the post with postid
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Post with ID ${post.postId} updates with new values.');
        pool.end();
    })
}

async function insertAnimal(animal){
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()
    const query = {
        text: 'INSERT INTO appearance (furcolorid, eyecolorid, accessories) VALUES ($1, $2, $3) RETURNING appearanceid',
        values: [animal.appearance.furColor.furColorId, animal.appearance.eyeColor.eyeColorId, animal.appearance.accessory],
    };

    // Executing query for inserting the new values of the appearance
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Appearance with ID ${res.rows[0].appearanceid} inserted.');
    })

    query.text = 'INSERT INTO animals (name, appearanceid, path, breedid, specieid) VALUES ($1, $2, $3, $4, $5) RETURNING animalid';
    query.values = [animal.name, res.rows[0].appearanceid, animal.imagePath, animal.breed.breedId, animal.specie.specieId]
    // Executing query for inserting the new values of the animal
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Animal with ID ${res.rows[0].animalid} inserted.');
        pool.end();
        return res.rows[0].animalid;
    })
}

async function insertUser(user){
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()
    const query = {
        text: 'INSERT INTO users (name, surname, phonenumber, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid',
        values: [user.name, user.surname, user.phone, user.email, user.password, user.role],
    };

    // Executing query for inserting the new values of the user
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('User with ID ${res.rows[0].userid} inserted.');
        pool.end();
        return res.rows[0].userid;
    })
}

async function insertPost(post){
    // Create Pool in order to execute queries
    const { Pool } = require('pq')
    const pool = new Pool()
    const query = {
        text: 'INSERT INTO posts (name, userid, animalid, createdat, completedat, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING postid',
        values: [post.name, post.user.userId, post.animal.animalId, post.createdAt, post.completedAt, post.status],
    };

    // Executing query for inserting the new values of the post
    pool.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        console.log('Post with ID ${res.rows[0].postid} inserted.');
        pool.end();
        return res.rows[0].postid;
    })
}
