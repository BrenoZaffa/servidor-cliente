<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { deslogarUser, getOccurrences, getOccurrencesByUser, deleteOccurrence } from '../services/user';
  import { transition_in } from 'svelte/internal';

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

    const editOccurrence = (occurrence) => {
        if(occurrence)
            sessionStorage.setItem('occurrence', JSON.stringify(occurrence));
        else
            sessionStorage.removeItem('occurrence');
        goto(`/occurrence`);
    }

    const delOccurrence = async (id) => {
        let res = await deleteOccurrence(id);
        if(res.status == 200) {
            publicacoes = publicacoes.filter((publi) => publi.id != id);
            publicacoes = [...publicacoes];

            publicacoesUser = publicacoesUser.filter((publi) => publi.id != id);
            publicacoesUser = [...publicacoesUser];
        }
    }

    const changeMenu = async (idElementMenu) => {
        let navs = document.querySelectorAll('.nav-link');
        navs.forEach((nav) => {
            nav.classList.remove('active');
            nav.setAttribute('aria-selected', false);
        });

        let panes = document.querySelectorAll('.tab-pane');
        panes.forEach((pane) => {
            pane.classList.remove('show');
            pane.classList.remove('active');
        });

        let nav = document.getElementById(idElementMenu+'-tab');
        nav.classList.add('active');
        nav.setAttribute('aria-selected', true);

        let pane = document.getElementById(idElementMenu);
        pane.classList.add('show');
        pane.classList.add('active');
    }

    let token
    let user = {}
    let publicacoesUser = []
    onMount(async () => {
        user = await JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        token = sessionStorage.getItem('token');

        let response = await getOccurrences();
        if(response.status == 200) {
            publicacoes = await response.data;
            console.log("accurrences",response);
        }

        if(token){
            response = await getOccurrencesByUser(user.id);
            if(response.status == 200) {
                publicacoesUser = await response.data;
                console.log("accurrences user",response);
            }
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
    <div class="col-12">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button on:click={() => changeMenu('nav-Ocorrencias')} class="nav-link active" id="nav-Ocorrencias-tab" data-bs-toggle="tab" data-bs-target="#nav-Ocorrencias" type="button" role="tab" aria-controls="nav-Ocorrencias" aria-selected="true">Ocorrências</button>
                <button on:click={() => changeMenu('nav-MinhasOcorrencias')} class="nav-link" id="nav-MinhasOcorrencias-tab" data-bs-toggle="tab" data-bs-target="#nav-MinhasOcorrencias" type="button" role="tab" aria-controls="nav-MinhasOcorrencias" aria-selected="false">Minhas Ocorrências</button>
            </div>
        </nav>

        <div class="tab-content mt-2" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-Ocorrencias" role="tabpanel" aria-labelledby="nav-Ocorrencias-tab" tabindex="0">
                <div class="row">
                    <div class="col-12 mb-3" style="display: flex; place-content: space-between;">
                        <h2><b>Ocorrências</b></h2>
                        {#if token}
                            <button type="button" on:click={() => editOccurrence(null)} class="btn btn-success"><i class="bi bi-plus-lg"></i> Cadastrar Ocorrência</button>
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
                                    <th class="text-center">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each publicacoes as publi, i(publi)}
                                    <tr>
                                        <td class="text-center">{new Date(publi.registered_at).toLocaleString("pt-BR",{timeZone:"UTC"})}</td>
                                        <td class="text-center">{publi.km}</td>
                                        <td class="text-center">{occurenceTypes?.[publi.occurrence_type]}</td>
                                        <td class="text-center">{publi.local}</td>
                                        <td class="text-center">
                                            {#if publi.user_id == user?.id}
                                                <button on:click={() => editOccurrence(publi)} class="btn btn-sm btn-primary"><i class="bi bi-pencil"></i></button>
                                                <button on:click={() => delOccurrence(publi.id)} class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-MinhasOcorrencias" role="tabpanel" aria-labelledby="nav-MinhasOcorrencias-tab" tabindex="0">
                <div class="row">
                    <div class="col-12 mb-3" style="display: flex; place-content: space-between;">
                        <h2><b>Minhas Ocorrências</b></h2>
                        {#if token}
                            <button type="button" on:click={() => editOccurrence(null)} class="btn btn-success"><i class="bi bi-plus-lg"></i> Cadastrar Ocorrência</button>
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
                                    <th class="text-center">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each publicacoesUser as publi, i(publi)}
                                    <tr>
                                        <td class="text-center">{new Date(publi.registered_at).toLocaleString("pt-BR",{timeZone:"UTC"})}</td>
                                        <td class="text-center">{publi.km}</td>
                                        <td class="text-center">{occurenceTypes?.[publi.occurrence_type]}</td>
                                        <td class="text-center">{publi.local}</td>
                                        <td class="text-center">
                                            <button on:click={() => editOccurrence(publi)} class="btn btn-sm btn-primary"><i class="bi bi-pencil"></i></button>
                                            <button on:click={() => delOccurrence(publi.id)} class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
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

    td, th {
        vertical-align: middle !important;
    }
</style>