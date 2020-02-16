<template>
    <div class="post-container">
        <Header :current-user="loggedUser" @logout="logOut"/>

        <div class="post-content">
            <h2 class="all-posts">Все посты</h2>
            <button class="btn btn__yellow" @click="openModal('create', {})" v-if="writer">+ Добавить пост</button>

            <div class="posts">
                <div class="post" v-for="post in pageablePosts" :key="post.id">
                    <div class="title">{{ post.title }}</div>
                    <div class="description">{{ post.description }}</div>
                    <div class="claps">
                        <img src="../assets/clap-blue.png" alt="Хлопки">
                        <div class="clap-count">{{ post.claps }}</div>
                    </div>
                    <div class="actions">
                        <button class="btn btn__blue" @click="openModal('update', post)" v-if="writer">
                            Редактировать
                        </button>
                        <button class="btn btn__red" @click="openModal('delete', post)" v-if="writer">
                            Удалить
                        </button>
                        <button class="clap-btn" @click="clapPost(post)" v-if="reader" title="Хлопнуть">
                            <img src="../assets/clap-blu2.png">
                        </button>
                    </div>
                </div>
            </div>

            <div class="paginate" v-if="posts.length > 10">
                <jw-pagination
                    :labels="customLabels"
                    :disableDefaultStyles="true"
                    :items="posts"
                    @changePage="onChangePage"/>
            </div>
        </div>

        <md-dialog :md-active.sync="showModal" class="posts">
            <template v-if="mode == 'create' || mode == 'update'">
                <md-dialog-title>
                    {{ mode == 'create' ? 'Создание поста' : 'Редактирование поста' }}
                </md-dialog-title>
                <md-dialog-content>
                    <form>
                        <md-field>
                            <label>Заголовок</label>
                            <md-input v-model="postObj.title"/>
                        </md-field>

                        <md-field>
                            <label>Текст</label>
                            <md-textarea v-model="postObj.description"/>
                        </md-field>
                    </form>
                </md-dialog-content>
                <md-dialog-actions>
                    <button @click="submitPost" class="btn btn__green">Сохранить</button>
                </md-dialog-actions>
            </template>
            <template v-if="mode == 'delete'">
                <md-dialog-content>
                    <h3 class="delete-confirm">Вы действительно хотите удалить?</h3>
                </md-dialog-content>
                <md-dialog-actions>
                    <button @click="deletePost" class="btn btn__red">Удалить</button>
                </md-dialog-actions>
            </template>
        </md-dialog>
    </div>
</template>

<script>
    import Header from './Header.vue';
    import {PostService} from '../services/post.service';
    const postService = new PostService();

    const customLabels = {
        previous: '<<',
        next: '>>'
    };

    export default {
        name: 'post',
        components: {
            Header
        },

        data() {
            return {
                customLabels,
                postObj: {
                    title: '',
                    description: '',
                    claps: 0,
                    date: ''
                },
                posts: [],
                pageablePosts: [],
                loggedUser: false,
                showModal: false,
                mode: ''
            }
        },

        computed: {
            writer() {
                return this.loggedUser && this.loggedUser.role === 'writer';
            },
            reader() {
                return this.loggedUser && this.loggedUser.role === 'reader';
            }
        },

        created() {
            this.loggedUser = JSON.parse(window.localStorage.getItem('user'));
        },

        mounted() {
            this.fetchPosts();
        },



    }
</script>

<style lang="scss">

</style>