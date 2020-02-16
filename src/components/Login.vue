<template>
    <div class="login-container">
        <div class="login-content">
            <div class="login-info">
                <div>Писатель - <b>Логин: </b>writer@mail.com, <b>Пароль: </b>12345w</div>
                <div>Читатель - <b>Логин: </b>reader@mail.com, <b>Пароль: </b>12345r</div>
            </div>
            <div class="form">
                <h2>Вход в систему</h2>
                <md-field>
                    <label>Логин</label>
                    <md-input v-model="login"/>
                </md-field>

                <md-field>
                    <label>Пароль</label>
                    <md-input type="password" v-model="password"/>
                </md-field>
                <div class="actions">
                    <button type="button" class="submit" @click="submitLogin">Войти</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {LoginService} from '../services/login.service';
    const loginService = new LoginService();

    export default {
        name: 'login',
        data() {
            return {
                login: '',
                password: ''
            }
        },

        methods: {
            submitLogin() {
                loginService.login().then(res => {
                    let foundUser = res.data.find(user => user.login === this.login && user.password === this.password);
                    if (foundUser) {
                        window.localStorage.setItem('user', JSON.stringify(foundUser));
                        this.$router.push({name: 'posts'});
                    } else {
                        this.$toaster.error('Неправильно введен пароль или логин', {timeout: 2000})
                    }
                }).catch(err => {
                    console.log(err);
                    this.$toaster.error('Что-то пошло не так', {timeout: 2000})
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        background: orange;
        height: 100vh;
        display: flex;
        align-items: center;

        .login-content {
            margin: 0 auto;

            .login-info {
                margin-bottom: 50px;
            }
        }

        .form {
            width: 500px;

            .md-field {
                background: azure;
                border-radius: 3px;
                padding-left: 5px;
            }

            .actions {
                text-align: center;
                .submit {
                    background: greenyellow;
                    border: 0;
                    border-radius: 3px;
                    padding: 10px 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>