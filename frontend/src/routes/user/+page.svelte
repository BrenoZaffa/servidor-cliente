<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let token
    let user = {}
    onMount(async () => {
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        token = sessionStorage.getItem('token');
    });
</script>

<div class="cont">
    <div class="box">
        <div class="row">
            
        </div>
    </div>
</div>

<style>
    .cont {
        width: 100vw;
        height: 100vh;
        background: #193549;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>