// Login -->
function login() {
    const login_param = {
        uid: $('#uId').val(),
        pw: $('#uPw').val()
    }
    $.post('/login/login', login_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
        else {
            $('#uId').val('');
            $('#uPw').val('');
        }

    })
}
function logout() {
    $.post('/login/logout', (returnData) => {
        alert(returnData.message);
        location.reload();
    })
}

function close() {
    $('#uId').val('');
    $('#uPw').val('');
}

// researcher 
function researcher() {
    console.log('function.js의 memberSave() 들어옴');
    const save_param = {
        name: $('#researcherInsert_name').val(),
        department: $('#researcherInsert_department').val(),
        Email: $('#researcherInsert_Email').val(),
        YearOfAdmission: $('#researcherInsert_yearOfAdmission').val(),
        ResearchTopics: $('#researcherInsert_researchTopics').val(),
    }
    $.post('/researcher/researcher', save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        } else {
            $('#researcherInsert_name').val('');
            $('#researcherInsert_department').val('');
            $('#researcherInsert_Email').val('');
            $('#researcherInsert_yearOfAdmission').val('');
            $('#researcherInsert_researchTopics').val('');
        }
    })
}

function researcher_delete(delete_name) {
    const remove_param = {
        delete_member: delete_name,
    }
    $.post('/researcher/researcher_delete', remove_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
}

// member edit-->
function researcher_update() {
    const update_param = {
        id: $('#researcherUpdate_number').val(),
        name: $('#researcherUpdate_name').val(),
        department: $('#researcherUpdate_department').val(),
        Email: $('#researcherUpdate_Email').val(),
        YearOfAdmission: $('#researcherUpdate_yearOfAdmission').val(),
        ResearchTopics: $('#researcherUpdate_researchTopics').val(),
    }
    $.post('/researcher/researcher_update', update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
}