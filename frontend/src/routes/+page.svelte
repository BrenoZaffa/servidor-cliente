<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { deslogarUser, getOccurrences } from '../services/user';

    let publicacoes = [];
    let occurenceTypes = {
        1: "Atropelamento",
        2: "Deslizamento",
        3: "Colisão frontal",
        4: "Capotagem",
        5: "Saída de pista",
        6: "Batida em objeto fixo",
        7: "Veículo avariado",
        8: "Colisão com motocicletas",
        9: "Colisão no mesmo sentido ou transversal",
        10: "Construção",
    }

    const deslogar = async () => {
        var res = await deslogarUser(user.id);
        if(res.status == 200 || res.status == 401) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            window.location.href = '/';
        }
    }

    const teste = () => {
        var meuModal = document.getElementById('staticBackdrop');
        var modal = new bootstrap.Modal(meuModal);
        modal.show();
    }

    let token
    let user = {}
    onMount(async () => {
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        token = sessionStorage.getItem('token');

        let response = await getOccurrences();
        if(response.status == 200) {
            publicacoes = await response.data;
            console.log("accurrences",response);
        }
    });
    
</script>

<svelte:head>
    <link rel="shortcut icon" href="/geo-alt.svg">
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
    <div class="col-12 mb-3" style="display: flex; place-content: space-between;">
        <h2><b>Ocorrências</b></h2>
        {#if token}
            <button type="button" on:click={() => goto("/occurrence")} class="btn btn-success"><i class="bi bi-plus-lg"></i> Cadastrar Ocorrência</button>
        {/if}
    </div>
    <div class="col-12">
        <table class="table table-bordered table-striped" width="100%" style="box-shadow: 0 10px 40px #00000056;">
            <thead>
                <tr>
                    <th class="text-center">Data</th>
                    <th class="text-center">KM</th>
                    <th class="text-center">Tipo</th>
                    <th class="text-center">Local</th>
                </tr>
            </thead>
            <tbody>
                {#each publicacoes as publi}
                    <tr>
                        <td class="text-center">{publi.registered_at}</td>
                        <td class="text-center">{publi.km}</td>
                        <td class="text-center">{occurenceTypes?.[publi.occurrence_type]}</td>
                        <td class="text-center">{publi.local}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    th{
        font-size: 20px;
    }
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