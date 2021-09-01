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

// paper페이지 - conference
function journal_insert() {
    const journal_save_param = {
        year: $('#journalInsert_year').val(),
        part: $('#journalInsert_part').val(),
        date: $('#journalInsert_date').val(),
        authors: $('#journalInsert_authors').val(),
        title: $('#journalInsert_title').val(),
        journal_name: $('#journalInsert_journal_name').val(),
        other: $('#journalInsert_other').val(),
        ISSN: $('#journalInsert_ISSN').val(),
        paper_index: $('#journalInsert_paper_index').val(),
        IF_: $('#journalInsert_IF_').val(),
        found_: $('#journalInsert_found_').val(),
        doi: $('#journalInsert_doi').val(),
    }
    $.post('/paper/journal_insert', journal_save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

function journal_delete(delete_title) {
    const journal_remove_param = {
        delete_journal: delete_title,
    }
    $.post('/paper/journal_delete', journal_remove_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
}

function journal_update() {
    const journal_update_param = {
        id: $('#journalUpdate_number').val(),
        year: $('#journalUpdate_year').val(),
        part: $('#journalUpdate_part').val(),
        date: $('#journalUpdate_date').val(),
        authors: $('#journalUpdate_authors').val(),
        title: $('#journalUpdate_title').val(),
        journal_name: $('#journalUpdate_journal_name').val(),
        other: $('#journalUpdate_other').val(),
        ISSN: $('#journalUpdate_ISSN').val(),
        paper_index: $('#journalUpdate_paper_index').val(),
        IF_: $('#journalUpdate_IF_').val(),
        found_: $('#journalUpdate_found_').val(),
        doi: $('#journalUpdate_doi').val(),
    }
    $.post('/paper/journal_update', journal_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

// paper페이지 - conference
function conference_insert() {
    const conference_save_param = {
        year: $('#conferenceInsert_year').val(),
        part: $('#conferenceInsert_part').val(),
        date: $('#conferenceInsert_date').val(),
        authors: $('#conferenceInsert_authors').val(),
        title: $('#conferenceInsert_title').val(),
        proceeding: $('#conferenceInsert_proceeding').val(),
        ISSN: $('#conferenceInsert_ISSN').val(),
        place: $('#conferenceInsert_place').val(),
        found: $('#conferenceInsert_found').val(),
        remarks: $('#conferenceInsert_remarks').val(),
    }
    $.post('/paper/conference_insert', conference_save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

function conference_delete(delete_title) {
    const conference_remove_param = {
        delete_conference: delete_title,
    }
    console.log(conference_remove_param);
    $.post('/paper/conference_delete', conference_remove_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
}

function conference_update() {
    const conference_update_param = {
        id: $('#conferenceUpdate_number').val(),
        year: $('#conferenceUpdate_year').val(),
        part: $('#conferenceUpdate_part').val(),
        date: $('#conferenceUpdate_date').val(),
        authors: $('#conferenceUpdate_authors').val(),
        title: $('#conferenceUpdate_title').val(),
        proceeding: $('#conferenceUpdate_proceeding').val(),
        ISSN: $('#conferenceUpdate_ISSN').val(),
        place: $('#conferenceUpdate_place').val(),
        found: $('#conferenceUpdate_found').val(),
        remarks: $('#conferenceUpdate_remarks').val(),
    }
    $.post('/paper/conference_update', conference_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}