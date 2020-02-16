<template>
    <div class="header">
        <div class="info">
            <div class="user" v-if="currentUser">
                <div class="name">Здравствуйте {{ currentUser.name }},</div>
                <div class="logout" @click="$emit('logout')">Выйти</div>
            </div>
            <div class="login" v-else>
                <router-link :to="{name: 'login'}">Войти</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'post-header',
        props: ['currentUser'],
        data() {
            return {}
        },
    }
</script>

<style lang="scss" scoped>

</style>