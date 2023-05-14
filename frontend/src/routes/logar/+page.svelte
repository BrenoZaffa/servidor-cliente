<script>
    import { goto } from '$app/navigation';
    import md5 from 'md5';
    import { cadastarUser, logarUser } from '../../services/user';

    let userLogin = {}
    let userCadastro = {}

    let erroCadastro = false;

    const logar = async () => {
        let post = userLogin
        
        if(post.password)
            post.password = md5(post.password)
        
        let res = await logarUser(post)
        if(res.status == 200){
            localStorage.setItem("token", res.data.token)
            goto("/home")
        }
    }

    const realizarCadastro = async () => {
        let post = userCadastro

        if(await validaFormCadastro())
            return;
        
        if(post.password)
            post.password = md5(post.password)
        
        let res = await cadastarUser(post)
        
    }

    const validaFormCadastro = async () => {
        erroCadastro = false;

        if(!userCadastro.name || (userCadastro.name && (userCadastro.name.length < 2 || userCadastro.name.length > 125)))
            erroCadastro = true;

        if(!userCadastro.email || (userCadastro.email && (userCadastro.email.split("@").length != 2 || (userCadastro.email.split("@")?.[1] == "" || userCadastro.email.split("@")?.[0] == "") || userCadastro.email.length < 10 || userCadastro.email.length > 125)))
            erroCadastro = true;

        if(!userCadastro.password || (userCadastro.password && (userCadastro.password.length < 2 || userCadastro.password.length > 125)))
            erroCadastro = true;

        return erroCadastro;
    }
    
</script>

<svelte:head>
    <link rel="shortcut icon" href="/geo-alt.svg" >
    <title>SAOITR - Login</title> 
</svelte:head>

<div class="cont">
    <div class="box">
        <div class="row">
            <div class="col-12">
                <h3 class="text-white"><b>Login</b></h3>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control form-control-sm" id="email-input-cadastro" placeholder="name@example.com" bind:value={userLogin.email}>
                    <label for="email-input">Email</label>
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <input type="password" class="form-control form-control-sm" id="password-input-cadastro" placeholder="Password" bind:value={userLogin.password}>
                    <label for="password-input">Senha</label>
                </div>
            </div>
            <div class="col-12 mt-3 d-grid">
                <button on:click={() => logar()} type="button" class="btn btn btn-success btn-block"><i class="far fa-plus-square"></i> Logar</button>
            </div>
        </div>
        <hr>
        <div class="col-12">
            <h3 class="text-white"><b>Cadastro</b></h3>
        </div>
        <div class="col-12 mt-3">
            <div class="form-floating mb-3">
                <input type="text" class="form-control form-control-sm" id="nome-input" placeholder="Nome" bind:value={userCadastro.name}>
                <label for="nome-input">Nome</label>
                {#if erroCadastro}
                    {#if !userCadastro.name}<p class="error-input mt-1 p-1">Nome é obrigatório!</p>{/if}
                    {#if userCadastro.name && (userCadastro.name.length < 2 || userCadastro.name.length > 125)}<p class="error-input mt-1 p-1">Nome deve ter entre 2 e 125 caracteres!</p>{/if}
                {/if}
            </div>
        </div>
        <div class="col-12">
            <div class="form-floating mb-3">
                <input type="email" class="form-control form-control-sm" id="email-input" placeholder="name@example.com" bind:value={userCadastro.email}>
                <label for="email-input">Email</label>
                {#if erroCadastro}
                    {#if !userCadastro.email}<p class="error-input mt-1 p-1">Email é obrigatório!</p>{/if}
                    {#if userCadastro.email && (userCadastro.email.split("@").length != 2 || (userCadastro.email.split("@")?.[1] == "" || userCadastro.email.split("@")?.[0] == ""))}
                        <p class="error-input mt-1 p-1">Informe um email válido!</p>
                    {/if}
                    {#if userCadastro.email && (userCadastro.email.length < 10 || userCadastro.email.length > 125)}
                        <p class="error-input mt-1 p-1">Email deve ter entre 10 e 125 caracteres!</p>
                    {/if}
                {/if}
            </div>
        </div>
        <div class="col-12">
            <div class="form-floating">
                <input type="password" class="form-control form-control-sm" id="password-input" placeholder="Password" bind:value={userCadastro.password}>
                <label for="password-input">Senha</label>
                {#if erroCadastro}
                    {#if !userCadastro.password}<p class="error-input mt-1 p-1">Senha é obrigatório!</p>{/if}
                    {#if userCadastro.password && (userCadastro.password.length < 2 || userCadastro.password.length > 125)}<p class="error-input mt-1 p-1">Senha deve ter entre 2 e 125 caracteres!</p>{/if}
                {/if}
            </div>
        </div>
        <div class="col-12 mt-3 d-grid">
            <button on:click={() => realizarCadastro()} type="button" class="btn btn btn-success btn-block"><i class="far fa-plus-square"></i> Cadastrar</button>
        </div>
    </div>
</div>

<style>
    .error-input {
        color: #ffda6a;
        background-color: #332701;
        border-radius: 5px;
        border: #997404 2px solid;
    }
    .cont {
        width: 100vw;
        height: 100vh;
        background: #193549;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .box {
        padding: 20px;
        width: 500px;
        background: #2f384a;
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