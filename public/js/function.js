// Login -->
function login() {
    const login_param = {
        uid: $('#uId').val(),
        pw: $('#uPw').val()
    }
    $.post('/login/login', login_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        } else {
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
// function researcher() {
//     const researcher_save_param = {
//         name: $('#researcherInsert_name').val(),
//         department: $('#researcherInsert_department').val(),
//         Email: $('#researcherInsert_Email').val(),
//         YearOfAdmission: $('#researcherInsert_yearOfAdmission').val(),
//         ResearchTopics: $('#researcherInsert_researchTopics').val(),
//     }
//     $.post('/researcher/researcher', researcher_save_param, (returnData) => {
//         if (returnData.key) {
//             location.reload();
//         } else {
//             $('#researcherInsert_name').val('');
//             $('#researcherInsert_department').val('');
//             $('#researcherInsert_Email').val('');
//             $('#researcherInsert_yearOfAdmission').val('');
//             $('#researcherInsert_researchTopics').val('');
//         }
//     })
//     location.reload();
// }

function researcher_delete(delete_name) {
    const researcher_remove_param = {
        delete_img: delete_name + ".jpg",
        delete_member: delete_name
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/researcher/researcher_delete', researcher_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        });
    } else {
        return;
    }
}

// function researcher_update() {
//     const researcher_update_param = {
//         id: $('#researcherUpdate_number').val(),
//         name: $('#researcherUpdate_name').val(),
//         department: $('#researcherUpdate_department').val(),
//         Email: $('#researcherUpdate_Email').val(),
//         YearOfAdmission: $('#researcherUpdate_yearOfAdmission').val(),
//         ResearchTopics: $('#researcherUpdate_researchTopics').val(),
//     }
//     $.post('/researcher/researcher_update', researcher_update_param, (returnData) => {
//         if (returnData.key) {
//             location.reload();
//         }
//     })
//     location.reload();
// }

// alumni 
// function alumni() {
//     const alumni_save_param = {
//         name: $('#alumniInsert_name').val(),
//         department: $('#alumniInsert_department').val(),
//         Email: $('#alumniInsert_Email').val(),
//         YearOfAdmission: $('#alumniInsert_yearOfAdmission').val(),
//         YearOfGraduation: $('#alumniInsert_yearOfGraduation').val(),
//         ResearchTopics: $('#alumniInsert_researchTopics').val(),
//     }
//     $.post('/alumni/alumni', alumni_save_param, (returnData) => {
//         if (returnData.key) {
//             location.reload();
//         }
//     })
//     location.reload();
// }

function alumni_delete(delete_name) {
    const alumni_remove_param = {
        delete_img: delete_name + ".jpg",
        delete_member: delete_name
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/alumni/alumni_delete', alumni_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
}

// function alumni_update() {
//     const researcher_update_param = {
//         id: $('#alumniUpdate_number').val(),
//         name: $('#alumniUpdate_name').val(),
//         department: $('#alumniUpdate_department').val(),
//         Email: $('#alumniUpdate_Email').val(),
//         YearOfAdmission: $('#alumniUpdate_yearOfAdmission').val(),
//         YearOfGraduation: $('#alumniUpdate_yearOfGraduation').val(),
//         ResearchTopics: $('#alumniUpdate_researchTopics').val(),
//     }
//     $.post('/alumni/alumni_update', researcher_update_param, (returnData) => {
//         if (returnData.key) {
//             location.reload();
//         }
//     })
//     location.reload();
// }

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
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/paper/journal_delete', journal_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
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
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/paper/conference_delete', conference_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
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




// Others페이지 - license
function license_insert() {
    const license_save_param = {
        part: $('#licenseInsert_part').val(),
        application_date: $('#licenseInsert_application_date').val(),
        application_num: $('#licenseInsert_application_num').val(),
        registration_date: $('#licenseInsert_registration_date').val(),
        registration_num: $('#licenseInsert_registration_num').val(),
        license_name: $('#licenseInsert_license_name').val(),
        application_place: $('#licenseInsert_application_place').val(),
        inventor: $('#licenseInsert_inventor').val(),
        work: $('#licenseInsert_work').val(),
    }
    $.post('/others/license_insert', license_save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

function license_delete(delete_title) {
    const license_remove_param = {
        delete_license: delete_title,
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/others/license_delete', license_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
}

function license_update() {
    const license_update_param = {
        id: $('#licenseUpdate_number').val(),
        part: $('#licenseUpdate_part').val(),
        application_date: $('#licenseUpdate_application_date').val(),
        application_num: $('#licenseUpdate_application_num').val(),
        registration_date: $('#licenseUpdate_registration_date').val(),
        registration_num: $('#licenseUpdate_registration_num').val(),
        license_name: $('#licenseUpdate_license_name').val(),
        application_place: $('#licenseUpdate_application_place').val(),
        inventor: $('#licenseUpdate_inventor').val(),
        work: $('#licenseUpdate_work').val(),
    }
    $.post('/others/license_update', license_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}


// award
function award_insert() {
    const award_save_param = {
        date: $('#awardInsert_date').val(),
        award_organization: $('#awardInsert_award_organization').val(),
        competition_name: $('#awardInsert_competition_name').val(),
        ranking: $('#awardInsert_ranking').val(),
        person: $('#awardInsert_person').val(),
        remarks: $('#awardInsert_remarks').val(),
    }
    $.post('/others/award_insert', award_save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

function award_delete(delete_title) {
    const award_remove_param = {
        delete_award: delete_title,
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/others/award_delete', award_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
}

function award_update() {
    const award_update_param = {
        id: $('#awardUpdate_number').val(),
        date: $('#awardUpdate_date').val(),
        award_organization: $('#awardUpdate_award_organization').val(),
        competition_name: $('#awardUpdate_competition_name').val(),
        ranking: $('#awardUpdate_ranking').val(),
        person: $('#awardUpdate_person').val(),
        remarks: $('#awardUpdate_remarks').val(),
    }
    $.post('/others/award_update', award_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

// book
function book_insert() {
    const book_save_param = {
        part: $('#bookInsert_date').val(),
        date: $('#bookInsert_date').val(),
        authors: $('#bookInsert_authors').val(),
        book_name: $('#bookInsert_book_name').val(),
        publisher: $('#bookInsert_publisher').val(),
        ISBN: $('#bookInsert_ISBN').val(),
        remarks: $('#bookInsert_remarks').val(),
    }
    $.post('/others/book_insert', book_save_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

function book_delete(delete_title) {
    const book_remove_param = {
        delete_book: delete_title,
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/others/book_delete', book_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
}

function book_update() {
    const book_update_param = {
        id: $('#bookUpdate_number').val(),
        part: $('#bookUpdate_part').val(),
        date: $('#bookUpdate_date').val(),
        authors: $('#bookUpdate_authors').val(),
        book_name: $('#bookUpdate_book_name').val(),
        publisher: $('#bookUpdate_publisher').val(),
        ISBN: $('#bookUpdate_ISBN').val(),
        remarks: $('#bookUpdate_remarks').val(),
    }
    $.post('/others/book_update', book_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}

// software
function software_insert() {
    const software_save_param = {
        part: $('#softwareInsert_part').val(),
        institution: $('#softwareInsert_institution').val(),
        sw_number: $('#softwareInsert_sw_number').val(),
        designation: $('#softwareInsert_designation').val(),
        writer: $('#softwareInsert_writer').val(),
        creative_date: $('#softwareInsert_creative_date').val(),
        registration_date: $('#softwareInsert_registration_date').val(),
        originator: $('#softwareInsert_originator').val(),
        found_: $('#softwareInsert_found_').val(),
        remarks: $('#softwareInsert_remarks').val(),
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/others/software_insert', software_save_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
    location.reload();
}

function software_delete(delete_title) {
    const software_remove_param = {
        delete_software: delete_title,
    }
    if (confirm("삭제하시겠습니까?") == true) {
        $.post('/others/software_delete', software_remove_param, (returnData) => {
            if (returnData.key) {
                location.reload();
            }
        })
    } else {
        return;
    }
}

function software_update() {
    const software_update_param = {
        id: $('#softwareUpdate_number').val(),
        part: $('#softwareUpdate_part').val(),
        institution: $('#softwareUpdate_institution').val(),
        sw_number: $('#softwareUpdate_sw_number').val(),
        designation: $('#softwareUpdate_designation').val(),
        writer: $('#softwareUpdate_writer').val(),
        creative_date: $('#softwareUpdate_creative_date').val(),
        registration_date: $('#softwareUpdate_registration_date').val(),
        originator: $('#softwareUpdate_originator').val(),
        found_: $('#softwareUpdate_found_').val(),
        remarks: $('#softwareUpdate_remarks').val(),
    }
    console.log(software_update_param);
    $.post('/others/software_update', software_update_param, (returnData) => {
        if (returnData.key) {
            location.reload();
        }
    })
    location.reload();
}