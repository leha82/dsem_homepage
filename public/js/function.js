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

// professor 
function professor_update() {
    const professor_update_param = {
        id: 1,
        name: $('#professorUpdate_name').val(),
        department: $('#professorUpdate_department').val(),
        Laboratory: $('#professorUpdate_Laboratory').val(),
        Email: $('#professorUpdate_Email').val(),    
        Location: $('#professorUpdate_Location').val(),
        FieldOfResearch: $('#professorUpdate_FieldOfResearch').val(),
    }
    $.post('/professor/professor_update', professor_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

// researcher 
function researcher() {
    const researcher_save_param = {
        name: $('#researcherInsert_name').val(),
        department: $('#researcherInsert_department').val(),
        Email: $('#researcherInsert_Email').val(),
        YearOfAdmission: $('#researcherInsert_yearOfAdmission').val(),
        ResearchTopics: $('#researcherInsert_researchTopics').val(),
    }
    $.post('/researcher/researcher', researcher_save_param, (returnData) => {
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
    location.reload();
}
function researcher_delete(delete_name) {
    const researcher_remove_param = {
        delete_member: delete_name,
    }
    $.post('/researcher/researcher_delete', researcher_remove_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
}
function researcher_update() {
    const researcher_update_param = {
        id: $('#researcherUpdate_number').val(),
        name: $('#researcherUpdate_name').val(),
        department: $('#researcherUpdate_department').val(),
        Email: $('#researcherUpdate_Email').val(),
        YearOfAdmission: $('#researcherUpdate_yearOfAdmission').val(),
        ResearchTopics: $('#researcherUpdate_researchTopics').val(),
    }
    $.post('/researcher/researcher_update', researcher_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

// alumni 
function alumni() {
    const alumni_save_param = {
        name: $('#alumniInsert_name').val(),
        department: $('#alumniInsert_department').val(),
        Email: $('#alumniInsert_Email').val(),
        YearOfAdmission: $('#alumniInsert_yearOfAdmission').val(),
        YearOfGraduation: $('#alumniInsert_yearOfGraduation').val(),
        ResearchTopics: $('#alumniInsert_researchTopics').val(),
    }
    $.post('/alumni/alumni', alumni_save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}
function alumni_delete(delete_name) {
    const alumni_remove_param = {
        delete_member: delete_name,
    }
    $.post('/alumni/alumni_delete', alumni_remove_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
}
function alumni_update() {
    const researcher_update_param = {
        id: $('#alumniUpdate_number').val(),
        name: $('#alumniUpdate_name').val(),
        department: $('#alumniUpdate_department').val(),
        Email: $('#alumniUpdate_Email').val(),
        YearOfAdmission: $('#alumniUpdate_yearOfAdmission').val(),
        YearOfGraduation: $('#alumniUpdate_yearOfGraduation').val(),
        ResearchTopics: $('#alumniUpdate_researchTopics').val(),
    }
    $.post('/alumni/alumni_update', researcher_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

// paper
function journal_update() {
    const paper_update_param = {
        id: $('#paperUpdate_number').val(),
        year: $('#paperUpdate_year').val(),
        part: $('#paperUpdate_part').val(),
        date: $('#paperUpdate_date').val(),
        authors: $('#paperUpdate_authors').val(),
        title: $('#paperUpdate_title').val(),
        journal_name: $('#paperUpdate_journal_name').val(),
        other: $('#paperUpdate_other').val(),
        ISSN: $('#paperUpdate_ISSN').val(),
        paper_index: $('#paperUpdate_paper_index').val(),
        IF_: $('#paperUpdate_IF_').val(),
        found_: $('#paperUpdate_found_').val(),
        doi: $('#paperUpdate_doi').val(),
    }
    $.post('/paper/journal_update', paper_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}