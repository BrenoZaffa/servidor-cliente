<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { atualizarUser, getUser } from '../../services/user';
    import { scale } from 'svelte/transition';
    import md5 from 'md5';

    let userCadastro = {}, returnCadastro
    let erroCadastro = false

    const validaForm = async () => {
        erroCadastro = false;

        if((userCadastro.name && (userCadastro.name.length < 2 || userCadastro.name.length > 125)))
            erroCadastro = true;

        if((userCadastro.email && (userCadastro.email.split("@").length != 2 || (userCadastro.email.split("@")?.[1] == "" || userCadastro.email.split("@")?.[0] == "") || userCadastro.email.length < 10 || userCadastro.email.length > 125)))
            erroCadastro = true;

        if((userCadastro.password && (userCadastro.password.length < 2 || userCadastro.password.length > 125)))
            erroCadastro = true;

        return erroCadastro;
    }

    const atualizaUser = async () => {
        let post = {...userCadastro}

        if(await validaForm())
            return;

        if(post.password)
            post.password = md5(post.password)

        returnCadastro = await atualizarUser(user.id, post)
        if(returnCadastro.status == 200){
            userCadastro = {}
            sessionStorage.removeItem('user')
            sessionStorage.setItem('user', JSON.stringify(returnCadastro.data))
        }
    }

    let token
    let user = {}
    let userApi = {}
    onMount(async () => {
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        token = sessionStorage.getItem('token');

        if(!token)
            goto('/logar')

        userApi = await getUser(user.id)
    });
</script>

<svelte:head>
    <link rel="shortcut icon" href="/geo-alt.svg" >
    <title>SAOITR - Usuário</title> 
</svelte:head>

<div class="cont">
    <div class="box">
        <div class="row">
            <div class="col-12">
                <h3 class="text-white"><b>Atualizar dados usuário</b></h3>
            </div>

            {#if returnCadastro?.status}
                <div class="col-12 mt-3">
                    <div in:scale={{duration: 500}} class="alert p-0 {returnCadastro.status == 200 ? "alert-success" : "alert-danger"}" role="alert">
                        <b class="msg-retorno">
                            {#if returnCadastro.status == 200}
                                <lottie-player src="/like.json"  background="transparent" speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
                            {:else}
                                <lottie-player src="/warning.json"  background="transparent" speed="1"  style="width: 50px; height: 50px;" loop autoplay></lottie-player>
                            {/if}
                            {returnCadastro?.data?.message ?? "Atualização do usuário realizada com sucesso!"}
                        </b>
                    </div>
                </div>
            {/if}
            <div class="col-12 mt-3">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control form-control-sm" id="nome-input" placeholder="Nome" bind:value={userCadastro.name}>
                    <label for="nome-input">Nome</label>
                    {#if erroCadastro}
                        {#if userCadastro.name && (userCadastro.name.length < 2 || userCadastro.name.length > 125)}<p class="error-input mt-1 p-1">Nome deve ter entre 2 e 125 caracteres!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control form-control-sm" id="email-input" placeholder="name@example.com" bind:value={userCadastro.email}>
                    <label for="email-input">Email</label>
                    {#if erroCadastro}
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
                        {#if userCadastro.password && (userCadastro.password.length < 2 || userCadastro.password.length > 125)}<p class="error-input mt-1 p-1">Senha deve ter entre 2 e 125 caracteres!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12 mt-3 d-grid">
                <button on:click={() => atualizaUser()} type="button" class="btn btn btn-success btn-block">Atualizar</button>
            </div>
        </div>
    </div>
</div>

<style>
    .cont {
        width: 100vw;
        height: 100vh;
        background: #193549;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .box {
        padding: 20px;
        width: 40vw;
        background: #2f384a;
        border-radius: 20px;
        box-shadow: 0 10px 40px #00000056;
    }

    .msg-retorno{
        display: flex;
        flex-direction: row;
        justify-content:start;
        align-items: center;
    }
</style>