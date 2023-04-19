import { Pool, QueryResult } from 'pg'
import { Animal } from '@interfaces/Animal';
import { User } from '@interfaces/User';
import { Post } from '@interfaces/Post';
const pool = new Pool();

/**
 * @param { Number } animalid - Id of the animal to be returned
 * @returns Row values representing Animal interface with the given animalid
 */

export async function getAnimal(animalid: number): Promise<Animal | null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'SELECT * FROM animals JOIN appearence JOIN furcolors JOIN eyecolors JOIN breeds JOIN species WHERE animalid = $1',
        values: [animalid],
    };
    let animal:Animal;

    // Executing query for getting variables from row of animals
    pool.query(query, (err, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        animal.name = res.rows[0].name;
        animal.imagePath = res.rows[0].path;
        animal.appearance.appearanceId = res.rows[0].appearenceid;
        animal.breed.breedId = res.rows[0].breedid;
        animal.specie.specieId = res.rows[0].specieid;
        animal.appearance.furColor.furColorId = res.rows[0].furcolorid;
        animal.appearance.eyeColor.eyeColorId = res.rows[0].eyecolorid;
        animal.appearance.accesory = res.rows[0].accessory;
        animal.appearance.furColor.name = res.rows[0].furcolor;
        animal.appearance.furColor.name = res.rows[0].eyecolor;
        animal.breed.brName = res.rows[0].brname;
        animal.specie.speName = res.rows[0].spename;
    })
    pool.end();
    return animal;
}

/**
 * @param {Number} userid - Id of the user to be returned
 * @returns Row values representing User interface with the given userid
 */
export async function getUser(userid:number):Promise<User|null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'SELECT * FROM users WHERE userid = $1',
        values: [userid],
    };
    let user:User;
    user.userId = userid;

    // Executing query for getting variables from row of users
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        user.name = res.rows[0].name;
        user.surname = res.rows[0].surname;
        user.phone = res.rows[0].phonenumber;
        user.email = res.rows[0].email;
        user.password = res.rows[0].password;
        user.role = res.rows[0].role;
    })
    pool.end();
    return user;
}

/**
 * @param {Number} postid - Id of the post to be returned
 * @returns Row values representing Post interface with the given postid
 */

export async function getPost(postid: number): Promise<Post|null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'SELECT * FROM posts WHERE postid = $1',
        values: [postid],
    };
    let userid = 0;
    let animalid = 0;
    let post:Post;

    // Executing query for getting variables from row of posts
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
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
export async function getAllThumbnails(): Promise<null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'SELECT postid, posts.name AS name, users.name AS username, animals.name AS animalname, animals.path AS imagePath, createdAt, completedAt, status FROM users NATURAL JOIN posts NATURAL JOIN animals',
    };

    // Executing query for getting values from users, posts and animals related to thumbnail interface
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return null;
        }
        pool.end();
        return res.rows
    })
    return null;
}

export async function updateUser(user: User): Promise<null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'UPDATE users SET name = $1, surname = $2, phonenumber = $3, email = $4, password = $5, role = $6 WHERE userid = $7',
        values: [user.name, user.surname, user.phone, user.email, user.password, user.role, user.userId],
    };

    // Executing query for updating the values of the user with userid
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        console.log('User with ID ${user.userId} updates with new values.');
    })
    pool.end();
    return null;
}

export async function updateAnimal(animal: Animal): Promise<null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'UPDATE animals SET name = $1, path = $2, breedid = $3, specieid = $4 WHERE animalid = $5',
        values: [animal.name, animal.imagePath, animal.breed.breedId, animal.specie.specieId, animal.animalId],
    };
    
    // TODO: need to make design decisions about how to handle furcolors, eyecolors, breeds and species to update
    // Executing query for updating the values of the animal with animalid
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        console.log('Animal with ID ${animal.animalId} updated with new values.');
    })

    query.text = 'UPDATE appearences SET furcolorid = $1, eyecolorid = $2, accessory = $3 WHERE appearenceid = $4';
    query.values = [animal.appearance.furColor.furColorId, animal.appearance.eyeColor.eyeColorId, animal.appearance.accesory, animal.appearance.appearanceId]

    // Executing query for updating the values of the appearence with appearenceid
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        console.log('Appearence with ID ${animal.appearance.appearanceId} updated with new values.');
    })
    pool.end();
    return null;
}

export async function updatePost(post: Post): Promise<null> {
    // Create Pool in order to execute queries
    const query = {
        text: 'UPDATE posts SET name = $1, completedAt = $2, status = $3 WHERE postid = $4',
        values: [post.name, post.completedAt,post.status, post.postId],
    };

    // Executing query for updating the values of the post with postid
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        console.log('Post with ID ${post.postId} updates with new values.');
        pool.end();
    })
    return null;
}

export async function insertAnimal(animal: Animal): Promise<number | null> {

    // Create Pool in order to execute queries
    let query = {
        text: 'INSERT INTO appearance (furcolorid, eyecolorid, accessories) VALUES ($1, $2, $3) RETURNING appearanceid',
        values: [animal.appearance.furColor.furColorId, animal.appearance.eyeColor.eyeColorId, animal.appearance.accesory],
    };
    let animalid:number = 0;
    let appearanceid:number = 0;

    // Executing query for inserting the new values of the appearance
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        appearanceid = res.rows[0].appearanceid;
        console.log('Appearance with ID ${appearanceid} inserted.');
    })

    query.text = 'INSERT INTO animals (name, appearanceid, path, breedid, specieid) VALUES ($1, $2, $3, $4, $5) RETURNING animalid';
    query.values = [animal.name, appearanceid, animal.imagePath, animal.breed.breedId, animal.specie.specieId]
    // Executing query for inserting the new values of the animal
    pool.query(query, (err: Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        animalid = res.rows[0].animalid
        console.log('Animal with ID ${animalid} inserted.');
    })
    pool.end();
    return animalid;
}

/**
 * Inserts the input user into the database, on error returns null instead of userID.
 * @param {User} user - The first parameter, a number.
 * @returns {Promise<number | null>} ID of the inserted user.
 */
export async function insertUser(user: User): Promise<number | null> {
    
    // Creating variables for queries to be executed and userid to be returned
    const query = {
        text: 'INSERT INTO users (name, surname, phonenumber, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid',
        values: [user.name, user.surname, user.phone, user.email, user.password, user.role],
    };
    let userid: number = 0;

    // Executing query for inserting the new values into user
    pool.query(query, (err:Error, res:QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        userid = res.rows[0].userid
        console.log('User with ID ${userid} inserted.');
    })
    pool.end();
    return userid;
}

/**
 * Inserts the input post into the database, on error returns null instead of postID.
 * @param {Post} post - The first parameter, a number.
 * @returns {Promise<number | null>} ID of the inserted post.
 */
export async function insertPost(post: Post): Promise<number | null> {
    
    // Creating variables for queries to be executed and postid to be returned
    const query = {
        text: 'INSERT INTO posts (name, userid, animalid, createdat, completedat, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING postid',
        values: [post.name, post.user.userId, post.animal.animalId, post.createdAt, post.completedAt, post.status],
    };
    let postid:number = 0;

    // Executing query for inserting the new values into post
    pool.query(query, (err:Error, res: QueryResult<any>) => {
        if (err) {
            console.error(err);
            return null;
        }
        postid = res.rows[0].postid;
        console.log('Post with ID ${postid} inserted.');    
    })
    pool.end();
    return postid;
}
