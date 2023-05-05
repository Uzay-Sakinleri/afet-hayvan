import { Post } from "@interfaces/Post";
import { deleteAnimal, getAllThumbnails, getAnimal, getPost, insertAnimal } from "../src/db/sql_methods";
import { Animal } from "../src/interfaces/Animal";
import { describe, it, expect } from 'vitest';

// getAnimal test
describe('db tests', () => {

    it('getAnimal', async () => {
        const res = await getAnimal(1) as Animal;
        expect(res.animalid).toEqual(1);
        expect(res.animalname).toEqual('Benekli');
        expect(res.furcolor).toEqual('beyaz');
        expect(res.eyecolor).toEqual('kahverengi');
        expect(res.accessory).toEqual('stuff');
        expect(res.breed).toEqual('something');
        expect(res.species).toEqual('something');
        expect(res.imagepath).toEqual('something');
    })

    it('getPost',async () => {
        const res = await getPost(1) as Post;
        expect(res.postid).toEqual(1);
        expect(res.userid).toEqual(100);
        expect(res.title).toEqual('kayip');
        expect(res.content).toEqual(null);
        expect(res.completedat).toEqual(null);
        expect(res.status).toEqual('active');
        expect(res.animal.animalid).toEqual(1);
        expect(res.animal.animalname).toEqual('Benekli');
        expect(res.animal.furcolor).toEqual('beyaz');
        expect(res.animal.eyecolor).toEqual('kahverengi');
        expect(res.animal.accessory).toEqual('stuff');
        expect(res.animal.breed).toEqual('something');
        expect(res.animal.species).toEqual('something');
        expect(res.animal.imagepath).toEqual('something');
    })

    it('getThumbnail', async () => {
        const res = await getAllThumbnails();
        expect(res[0].length).toEqual(2);
    })

    it('insertAnimal', async () => {
        const animal:Animal = {
            animalid: 0,
            animalname: 'pako',
            eyecolor: 'kahverengi',
            furcolor: 'kahvereng',
            accessory: 'stuff',
            breed: 'stuff',
            species: 'stuff',
            imagepath: 'stuff'
        }
        animal.animalid = await insertAnimal(animal)
        const new_animal = await getAnimal(animal.animalid) as Animal;
        expect(new_animal).toEqual(animal);
        deleteAnimal(animal.animalid)
    })

    it('deleteAnimal', async () => {
        deleteAnimal(2)

    })
})