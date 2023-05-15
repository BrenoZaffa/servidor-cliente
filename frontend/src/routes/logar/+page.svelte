<script>
    import { goto } from '$app/navigation';
    import md5 from 'md5';
    import { cadastarUser, logarUser } from '../../services/user';
    import { scale } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let userLogin = {}
    let userCadastro = {}

    let erroCadastro = false;
    let erroLogin = false;

    let returnLogin
    let returnCadastro

    onMount(async () => {
        if(sessionStorage.getItem("token"))
            goto("/")
    })

    const logar = async () => {
        returnLogin = {}
        let post = {...userLogin}

        if(await validaFormLogin())
            return;
        
        if(post.password)
            post.password = md5(post.password)
        
        returnLogin = await logarUser(post)
        if(returnLogin.status == 200){

            var userReturn = {
                name: returnLogin?.data?.name,
                email: returnLogin?.data?.email,
                id: returnLogin?.data?.id
            }
            sessionStorage.setItem("user", JSON.stringify(userReturn))

            sessionStorage.setItem("token", returnLogin?.data?.token)
            setTimeout(() => {
                goto("/")
            }, 2000);
        }
    }

    const realizarCadastro = async () => {
        returnCadastro = null
        let post = {...userCadastro}

        if(await validaFormCadastro())
            return;
        
        if(post.password)
            post.password = md5(post.password)
        
        returnCadastro = await cadastarUser(post)
        if(returnCadastro.status == 201){
            userCadastro = {}
        }
    }

    const validaFormLogin = async () => {
        erroLogin = false;

        if(!userLogin.email || (userLogin.email && (userLogin.email.split("@").length != 2 || (userLogin.email.split("@")?.[1] == "" || userLogin.email.split("@")?.[0] == "") || userLogin.email.length < 10 || userLogin.email.length > 125)))
            erroLogin = true;

        if(!userLogin.password || (userLogin.password && (userLogin.password.length < 2 || userLogin.password.length > 125)))
            erroLogin = true;

        return erroLogin;
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
            {#if returnLogin?.status}
                <div class="col-12 mt-3">
                    <div in:scale={{duration: 500}} class="alert p-0 {returnLogin.status == 200 ? "alert-success" : "alert-danger"}" role="alert">
                        <b class="msg-retorno">
                            {#if returnLogin.status == 200}
                                <lottie-player src="/like.json"  background="transparent" speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
                            {:else}
                                <lottie-player src="/warning.json"  background="transparent" speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
                            {/if}
                            {returnLogin?.data?.message ?? "Login realizado com sucesso!"}
                        </b>
                    </div>
                </div>
            {/if}
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control form-control-sm" id="email-input-cadastro" placeholder="name@example.com" bind:value={userLogin.email}>
                    <label for="email-input">Email</label>
                    {#if erroLogin}
                        {#if !userLogin.email}<p class="error-input mt-1 p-1">Email é obrigatório!</p>{/if}
                        {#if userLogin.email && (userLogin.email.split("@").length != 2 || (userLogin.email.split("@")?.[1] == "" || userLogin.email.split("@")?.[0] == ""))}
                            <p class="error-input mt-1 p-1">Informe um email válido!</p>
                        {/if}
                        {#if userLogin.email && (userLogin.email.length < 10 || userLogin.email.length > 125)}
                            <p class="error-input mt-1 p-1">Email deve ter entre 10 e 125 caracteres!</p>
                        {/if}
                    {/if}
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating">
                    <input type="password" class="form-control form-control-sm" id="password-input-cadastro" placeholder="Password" bind:value={userLogin.password}>
                    <label for="password-input">Senha</label>
                    {#if erroLogin}
                        {#if !userLogin.password}<p class="error-input mt-1 p-1">Senha é obrigatório!</p>{/if}
                        {#if userLogin.password && (userLogin.password.length < 2 || userLogin.password.length > 125)}<p class="error-input mt-1 p-1">Senha deve ter entre 2 e 125 caracteres!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12 mt-3 d-grid">
                <button on:click={() => logar()} type="button" class="btn btn btn-success btn-block">Logar</button>
            </div>
        </div>
        <hr>
        <div class="col-12">
            <h3 class="text-white"><b>Cadastro</b></h3>
        </div>
        {#if returnCadastro?.status}
            <div class="col-12 mt-3">
                <div in:scale={{duration: 500}} class="alert p-0 {returnCadastro.status == 201 ? "alert-success" : "alert-danger"}" role="alert">
                    <b class="msg-retorno">
                        {#if returnCadastro.status == 201}
                            <lottie-player src="/like.json"  background="transparent" speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
                        {:else}
                            <lottie-player src="/warning.json"  background="transparent" speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
                        {/if}
                        {returnCadastro?.data?.message ?? "Cadastro realizado com sucesso!"}
                    </b>
                </div>
            </div>
        {/if}
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
            <button on:click={() => realizarCadastro()} type="button" class="btn btn btn-success btn-block">Cadastrar</button>
        </div>
    </div>
    <div class="map">
        <lottie-player src="/area-map.json"  background="transparent" speed="1"  style="width: 90vw; height: 90vh;" loop autoplay></lottie-player>
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
        align-items: center;
        justify-content: space-between;
    }
    .box {
        padding: 20px;
        width: 90vw;
        background: #2f384a;
        border-radius: 20px;
        box-shadow: 0 10px 40px #00000056;
        margin-left: 10vw;
    }
    .map{
        width: 50vw;
        height: 100vh;
        margin-right: 10vw;
        display: flex;
        align-items: center;
    }
    @media only screen and (max-width: 600px) {
        .map{
            display: none;
        }
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

    .msg-retorno{
        display: flex;
        flex-direction: row;
        justify-content:start;
        align-items: center;
    }
</style>