<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let user = {
        email: '',
        password: '',
        username: '',
    }

    onMount(async () => {
        
    });
    
</script>

<svelte:head>
    <link rel="shortcut icon" href="/geo-alt.svg" >
    <title>Acidentes - Login</title> 
</svelte:head>

<div class="cont">
    <div class="box">
        <div class="row">
            <div class="col-12">
                <h3><b>Login</b></h3>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control form-control-sm" id="email-input" placeholder="name@example.com" bind:value={user.email}>
                    <label for="email-input">Email</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <input type="password" class="form-control form-control-sm" id="password-input" placeholder="Password" bind:value={user.password}>
                    <label for="password-input">Senha</label>
                </div>
            </div>
            <div class="col-12 mt-3 d-grid">
                <button type="button" class="btn btn btn-success btn-block"><i class="far fa-plus-square"></i> Logar</button>
            </div>
        </div>
        <hr>
        <div class="col-12">
            <h3><b>Cadastro</b></h3>
        </div>
        <div class="col-12 mt-3">
            <div class="form-floating mb-3">
                <input type="text" class="form-control form-control-sm" id="username-input" placeholder="name@example.com" bind:value={user.username}>
                <label for="username-input">Username</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-floating mb-3">
                <input type="email" class="form-control form-control-sm" id="email-input" placeholder="name@example.com" bind:value={user.email}>
                <label for="email-input">Email</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-floating">
                <input type="password" class="form-control form-control-sm" id="password-input" placeholder="Password" bind:value={user.password}>
                <label for="password-input">Senha</label>
            </div>
        </div>
        <div class="col-12 mt-3 d-grid">
            <button type="button" class="btn btn btn-info btn-block"><i class="far fa-plus-square"></i> Cadastrar</button>
        </div>
    </div>
</div>

<style>
    .cont {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(120deg, #38639A 0%, #B4D5FF 100%);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .box {
        padding: 20px;
        width: 500px;
        background: #fff;
        border-radius: 5px;
        border: 1px solid rgb(163, 163, 163);
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    .box:hover{
        box-shadow: 0 0 20px rgba(0,0,0,1);
    }
    h3{
        text-align: center;
        margin: 0;
    }
    hr{
        height: 2px;
        background: #38639A;
        border: none;
        border-radius: 100px;
    }
</style>