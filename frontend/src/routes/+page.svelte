<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { deslogarUser, getOccurrences } from '../services/user';

    let publicacoes = [];

    const deslogar = async () => {
        var res = await deslogarUser(user.id);
        if(res.status == 200 || res.status == 401) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            window.location.href = '/';
        }
    }

    let token
    let user = {}
    onMount(async () => {
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        token = sessionStorage.getItem('token');

        publicacoes = await getOccurrences();
    });
    
</script>

<svelte:head>
    <link rel="shortcut icon" href="/geo-alt.svg" >
    <title>SAOITR - Ocorrências</title> 
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-light bg-dark mb-3">
    <div class="container">
        <a class="navbar-brand mx-auto" href="/">SAOITR</a>
        <ul class="navbar-nav ml-auto">
            {#if token}
                <li class="nav-item text-white">
                    <button on:click={() => {goto("/user")}} class="btn text-white nav-link"><i class="bi bi-person-circle"></i> {user.name}</button>
                </li>
            {/if}
            <li class="nav-item">
                {#if token}
                    <button on:click={() => deslogar()} class="btn text-white nav-link"><i class="bi bi-box-arrow-in-right"></i> Logout</button>
                {:else}
                    <button on:click={() => {goto("/logar")}} type="button" class="btn text-white nav-link" href="/logar">Logar / Registrar</button>
                {/if}
            </li>
        </ul>
    </div>
</nav>

<div class="row m-3">
    <div class="col-12">
        <h2>
            <b>Ocorrências</b>
        </h2>
    </div>
    {#each publicacoes as publi}
        <div class="col-12">
            <p class="badge bg-black">{publi.km}</p>
            <p>{publi.local}</p>
            <p>{publi.occurrence_type}</p>
        </div>
    {/each}
</div>

<style>
    .nav-item{
        margin: 0 10px;
    }
    .navbar-brand {
        font-size: 42px;
        color: white;
    }

    .navbar-nav{
        font-size: 20px;
    }

    li:hover {
        border-bottom: 2px solid white;
    }
</style>