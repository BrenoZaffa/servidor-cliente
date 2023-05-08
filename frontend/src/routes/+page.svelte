<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let publicacoes = [
        {
            Descricao: "fbeirbviaebrvieabvvilsvysbvsuyrbvuysbvuse",
            br: "BR-545",
        },
        {
            Descricao: "sdfsdfsdf",
            br: "BR-54666",
        },
        {
            Descricao: "ddddddddddd",
            br: "BR-232",
        },
        {
            Descricao: "fbeirbviaebrvieabvvilsvysbvsuyrbvuysbvuse",
            br: "BR-11",
        },
    ];

    onMount(async () => {
        
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
            <li class="nav-item">
                <a class="nav-link" href="/logar">Logar / Registrar</a>
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
            <p class="badge bg-black">{publi.br}</p>
            <p>{publi.Descricao}</p>
        </div>
    {/each}
</div>

<style>
    .navbar-brand {
        font-size: 34px;
        color: white;
    }

    .nav-link {
        color: white;
    }

    li:hover {
        border-bottom: 2px solid white;
    }
</style>