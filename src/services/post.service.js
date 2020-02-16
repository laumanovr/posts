import axios from 'axios';

export class PostService {
    constructor() {}

    async getAll() {
        try {
            return await axios.get('http://localhost:3000/posts')
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async create(obj) {
        try {
            return await axios.post('http://localhost:3000/posts', obj);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async update(obj) {
        try {
            return await axios.put(`http://localhost:3000/posts/${obj.id}`, obj);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    async _delete(id) {
        try {
            return await axios.delete(`http://localhost:3000/posts/${id}`);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}