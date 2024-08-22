import { expect } from 'chai';
import request from 'request';

describe('test user routes (endpoints)', () => {
    let user = {
        username: 'testing',
    };

    describe('POST /api/user/create', () => {

        it('should return the correct data', () => {

            fetch('http://localhost:4000/api/user/create', {
                headers: {
                    'Content-Type': 'application/json',
                },

                method: 'POST',
                body: {
                    user
                },
            })
            .then(response => {
                console.log(response);
                // Test for username
                expect(response.body.username).to.equal(user.username);

                // Test response status code.
                expect(response.statusCode).to.equal(201);
            })
            .catch( error => {
                throw new Error(error.message);
            });
        });
    });

    describe('GET /api/user/:usernameOr:userId', () => {
        let userId;
        it('Should return user data by username: /api/user/:username', () => {
            fetch(`http://localhost:4000/api/user?username=${user.username}`)
            .then(response => {
                expect(response.statusCode).to.equal(200);

                expect(response.body.username).to.equal(user.username);

                userId = response.body._id;
            })
            .catch(error => {
                throw new Error(error.message);
            });
        });

        it('Should return user data by userId: /api/user/:userId', () => {
            fetch(`http://localhost:4000/api/user/${userId}`)
            .then(response => {
                expect(response.statusCode).to.equal(200);

                expect(response.body._id).to.equal(userId);

                expect(response.body.username).to.equal(user.username);
            })
            .catch(error => {
                throw new Error(error.message);
            })
        })
    });

    describe('PUT /api/user/:usernameOr:userId', () => {
        let userChange = { username: 'testingChangeByUsername' };
        let userId;

        it('Should change user data by :username: /api/user/update/:username', () => {
            fetch(`http://localhost:4000/api/user/update?username=${user.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                },

                method: 'PUT',
                body: {
                    userChange
                },
            })
            .then( response => {
                console.log(response);

                expect(response.statusCode).to.equal(200);

                expect(response.body.username).to.equal(userChange.username);

                userId = response.body._id;
            })
            .catch( error => {
                throw new Error(error.message);
            });
        });

        it('Should change user data by :userid: /api/user/update/:userId', () => {
            userChange.username = 'testingChnageByUserId';

            fetch(`http://localhost:4000/api/user/update/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },

                method: 'PUT',
                body: {
                    userChange,
                },
            })
            .then( response => {
                console.log(response);

                expect(response.statusCode).to.equal(200);

                expect(response.body.username).to.equal(userChange.username);

                user.username = userChange.username;
            })
            .catch( error => {
                throw new Error(error.message);
            });
        })
    });

    describe('DELETE /api/user/:usernameOr:userId', () => {
        let userIdToBeDeleted;
        let usernameToBeDeleted = 'testDeleting';

        beforeEach(() => {            
            fetch('http://localhost:4000/api/user/create', {
                headers: {
                    'Content-Type': 'application/json',
                },

                method: 'POST',
                body: {
                    usernameToBeDeleted,
                },
            })
            .then(response => {
                userIdToBeDeleted = response.body._id;
            })
            .catch( error => {
                throw new Error(error.message);
            });
        });

        it('Should delete user by username: /api/user/delete/:username', () => {
            fetch(`http://localhost:4000/api/user/delete?username=${usernameToBeDeleted}`, { method: 'DELETE' })
            .then( response => {
                console.log(response);

                expect(response.statusCode).to.equal(200);
            })
            .catch( error => {
                throw new Error(error.message);
            });
        });

        it('Should delete user by userid: /api/user/delete/:userId', () => {
            fetch(`http://localhost:4000/api/user/delete/${userIdToBeDeleted}`, { method: 'DELETE' })
            .then( response => {
                console.log(response);

                expect(response.statusCode).to.equal(200);
            })
            .catch( error => {
                throw new Error(error.message);
            });
        });
    });
});