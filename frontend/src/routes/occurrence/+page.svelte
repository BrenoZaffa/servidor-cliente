<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { insertOcorrencia } from '../../services/user';
    import { scale } from 'svelte/transition';
    // import utc from 'dayjs/plugin/utc';
    // import timezone from 'dayjs/plugin/timezone';
    // import dayjs from 'dayjs';

    // dayjs.extend(utc);
    // dayjs.extend(timezone);

    let ocorrencia = {}, returnCadastro
    let erroCadastro = false

    const validaForm = async () => {
        erroCadastro = false;

        if(!ocorrencia.local || ocorrencia.local.length < 1 || ocorrencia.local.length > 125)
            erroCadastro = true;
        
        if(!ocorrencia.km || ocorrencia.km < 1 || ocorrencia.km > 9999)
            erroCadastro = true;

        if(!ocorrencia.occurrence_type || ocorrencia.occurrence_type == "")
            erroCadastro = true;

        if(!ocorrencia.registered_at)
            erroCadastro = true;

        return erroCadastro;
    }

    const inserirOcorrencia = async () => {
        
        let post = {...ocorrencia}

        if(await validaForm())
            return;

        post.user_id = user.id

        // UTC pt-br
        var d1 = new Date(ocorrencia.registered_at);
        let d2 = new Date(d1.valueOf() - d1.getTimezoneOffset() * 60000);
        post.registered_at = d2.toISOString();

        returnCadastro = await insertOcorrencia(post)
        if(returnCadastro.status == 201){
            setTimeout(() => {
                goto('/')
            }, 1000);
        }
    }

    let token
    let user = {}
    onMount(async () => {
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        token = sessionStorage.getItem('token');

        if(!token)
            goto('/logar')

    });
</script>

<svelte:head>
    <link rel="shortcut icon" href="/geo-alt.svg" >
    <title>SAOITR - Ocorrência</title> 
</svelte:head>

<div class="cont">
    <div class="box">
        <div class="row">
            <div class="col-12">
                <h3 class="text-white"><b>Cadastrar Ocorrência</b></h3>
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
                            {returnCadastro?.data?.message ?? "Atualização do usuário realizada com sucesso!"}
                        </b>
                    </div>
                </div>
            {/if}
            <div class="col-12 mt-3">
                <div class="form-floating mb-3">
                    <input type="datetime-local" step="2" class="form-control form-control-sm" id="data-input" placeholder="Data" bind:value={ocorrencia.registered_at}>
                    <label for="data-input">Data</label>
                    {#if erroCadastro}
                        {#if !ocorrencia.registered_at}<p class="error-input mt-1 p-1">Data é obrigatório!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12 mt-3">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control form-control-sm" id="nome-input" placeholder="Nome" bind:value={ocorrencia.local}>
                    <label for="nome-input">Local</label>
                    {#if erroCadastro}
                        {#if !ocorrencia.local}<p class="error-input mt-1 p-1">Local é obrigatório!</p>{/if}
                        {#if ocorrencia.local && (ocorrencia.local.length < 1 || ocorrencia.local.length > 125)}<p class="error-input mt-1 p-1">Nome deve ter entre 1 e 125 caracteres!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12 mt-3">
                <div class="form-floating mb-3">
                    <input type="number" class="form-control form-control-sm" id="km-input" placeholder="Km" bind:value={ocorrencia.km}>
                    <label for="km-input">Km</label>
                    {#if erroCadastro}
                        {#if !ocorrencia.km}<p class="error-input mt-1 p-1">Km é obrigatório!</p>{/if}
                        {#if ocorrencia.km && (ocorrencia.km < 1 || ocorrencia.km > 9999)}<p class="error-input mt-1 p-1">Km deve ter entre 1 e 9999!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12 mt-3">
                <div class="form-floating mb-3">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example" bind:value={ocorrencia.occurrence_type}>
                        <option value="" selected>Selecione</option>
                        <option value="1">Atropelamento</option>
                        <option value="2">Deslizamento</option>
                        <option value="3">Colisão frontal</option>
                        <option value="4">Capotagem</option>
                        <option value="5">Saída de pista</option>
                        <option value="6">Batida em objeto fixo</option>
                        <option value="7">Veículo avariado</option>
                        <option value="8">Colisão com motocicletas</option>
                        <option value="9">Colisão no mesmo sentido ou transversal</option>
                        <option value="10">Construção</option>

                    </select>
                    <label for="floatingSelect">Tipo</label>
                    {#if erroCadastro}
                        {#if ocorrencia.occurrence_type == ""}<p class="error-input mt-1 p-1">Tipo é obrigatório!</p>{/if}
                    {/if}
                </div>
            </div>
            <div class="col-12 mt-3 d-grid">
                <button on:click={() => inserirOcorrencia()} type="button" class="btn btn btn-success btn-block">Salvar</button>
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

    .error-input {
        color: #ffda6a;
        background-color: #332701;
        border-radius: 5px;
        border: #997404 2px solid;
    }
</style>