//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// add motability routes here


// GB Telephony routes

// Eligibility launched from main UI
router.post('/gb-telephony/v1/signposting-eligibility/service-start-page', function(request, response) {
    var newClaim = request.session.data['new-claims']
    if (newClaim == 'yes'){
        response.redirect('/gb-telephony/v1/signposting-eligibility/new-ni-claims')
    } else if (newClaim == "no") {
        response.redirect('/gb-telephony/v1/signposting-eligibility/existing-claims')
    }
    })

    // NI new claims
    router.post('/gb-telephony/v1/signposting-eligibility/new-ni-claims', function(request, response) {
    var niPip = request.session.data['ni-pip']
    if (niPip == 'yes'){
        response.redirect('/gb-telephony/v1/signposting-eligibility/claiming-self')
    } else if (niPip == "england-wales") {
        response.redirect('/gb-telephony/v1/signposting-eligibility/england-wales')
    } else if (niPip == "scotland") {
        response.redirect('/gb-telephony/v1/signposting-eligibility/scotland')
    }
    })

    // Are you claiming for yourself?
    router.post('/gb-telephony/v1/signposting-eligibility/claiming-self', function(request, response) {
    var self = request.session.data['claiming-self']
    if (self == 'yes'){
        response.redirect('/gb-telephony/v1/signposting-eligibility/over-16')
    } else if (self == "no") {
        response.redirect('/gb-telephony/v1/signposting-eligibility/someone-else-bau-kickout')
    }
    })

    //Are you over 16?
    router.post('/gb-telephony/v1/signposting-eligibility/over-16', function(request, response) {
    var over16 = request.session.data['age']
    if (over16 == 'yes'){
        response.redirect('/gb-telephony/v1/signposting-eligibility/search-claimant')
    } else if (over16 == "no-under-16") {
        response.redirect('/gb-telephony/v1/signposting-eligibility/under-16-ineligible')
    } else if (over16 == "no-over-spa") {
        response.redirect('/gb-telephony/v1/signposting-eligibility/stop-getting-pip-last-year')
    }
    })

      // POST MTP: AGE ELIGIBILITY UPDATE TBC: Establish identity
 router.post('/gb-telephony/v1/signposting-eligibility/what-is-your-dob', function(request, response) {
    response.redirect('/gb-telephony/v1/signposting-eligibility/search-claimant')
       })

     // Establish identity
     router.post('/gb-telephony/v1/signposting-eligibility/search-claimant', function(request, response) {
            response.redirect('/gb-telephony/v1/signposting-eligibility/kbvs-checkboxes-link')
        })

 // What security questions were answered?
    router.post('/gb-telephony/v1/signposting-eligibility/kbvs-checkboxes-link', function(request, response) {
        var security = request.session.data['security']
        if (security == 'passed'){
            response.redirect('/gb-telephony/v1/signposting-eligibility/srel')
        } else if (security == "failed") {
            response.redirect('/gb-telephony/v1/signposting-eligibility/failed-security')
        }
        })

    // Failed security
         router.post('/gb-telephony/v1/signposting-eligibility/failed-security', function(request, response) {
         response.redirect('/gb-telephony/v1/signposting-eligibility/srel')
         })

    // Not enough applicant data
         router.post('/gb-telephony/v1/signposting-eligibility/not-enough-cis-data', function(request, response) {
         response.redirect('/gb-telephony/v1/signposting-eligibility/srel')
         })

    // Claiming under SREL?
    router.post('/gb-telephony/v1/signposting-eligibility/srel', function(request, response) {
        var srel = request.session.data['srel']
        if (srel == 'yes'){
            response.redirect('/gb-telephony/v1/signposting-eligibility/srel-bau-kickout')
        } else if (srel == "no") {
            response.redirect('/gb-telephony/v1/welcome-screens/welcome-screen-ni')
        }
        })

//--------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------


// DEVS
// Declaration
router.post('/gb-telephony/v1/declaration', function(request, response) {
    var agree = request.session.data['agree']
    if (agree == 'yes'){
        response.redirect('/gb-telephony/v1/task-list')
    } else if (agree == 'no') {
        response.redirect('/gb-telephony/v1/declaration-kickout')
    }
})

// -------------------------------------------------------------------------------------
// DEVS
//gb-telephony/v1/Contact-details

// What is your name
router.post('/gb-telephony/v1/contact-details/what-is-your-name', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/what-is-your-dob')
})

// What is your DOB
router.post('/gb-telephony/v1/contact-details/what-is-your-dob', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/what-is-your-phone-number')
})

// What is your phone number page
router.post('/gb-telephony/v1/contact-details/what-is-your-phone-number', function(request, response) {
        response.redirect("/gb-telephony/v1/contact-details/do-you-want-to-receive-text-updates")
})

// What is your Textphone number?
router.post('/gb-telephony/v1/contact-details/alt-formats/what-is-your-textphone-number', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/do-you-want-to-receive-text-updates')
})

// What signing or lipspeaking service do you need?
router.post('/gb-telephony/v1/contact-details/alt-formats/signing-lipspeaking', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/do-you-want-to-receive-text-updates')
})

// Do you want to receive text updates
router.post('/gb-telephony/v1/contact-details/do-you-want-to-receive-text-updates', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/what-is-your-postcode')
})

// What is your postcode page
router.post('/gb-telephony/v1/contact-details/what-is-your-postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/select-your-address')
})

// Select your address page
router.post('/gb-telephony/v1/contact-details/select-your-address', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/correspondence-address')
})

// Enter address manually page
router.post('/gb-telephony/v1/contact-details/enter-address-manually-country', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/correspondence-address')
})

// Is this the address we should send letters to page
router.post('/gb-telephony/v1/contact-details/correspondence-address', function(request, response) {
    var sendLettersElsewhere = request.session.data['should-we-write-to-you']
    if (sendLettersElsewhere == 'yes'){
        response.redirect('/gb-telephony/v1/contact-details/alt-formats/written-format')
    } else if (sendLettersElsewhere == 'no') {
        response.redirect('/gb-telephony/v1/contact-details/correspondence-postcode')
    }
})

// Would you like us to send your letters in another way, like larger text, audio or braille?
router.post('/gb-telephony/v1/contact-details/alt-formats/written-format', function(request, response) {
    var writtenFormat = request.session.data['written-format']
    if (writtenFormat == 'standard-letter'){
        response.redirect('/gb-telephony/v1/contact-details/contact-details-summary')
    } else if (writtenFormat == 'large-print') {
        response.redirect('/gb-telephony/v1/contact-details/alt-formats/large-print')
     } else if (writtenFormat == 'audio') {
        response.redirect('/gb-telephony/v1/contact-details/contact-details-summary')
    } else if (writtenFormat == 'braille') {
        response.redirect('/gb-telephony/v1/contact-details/contact-details-summary')
    } else if (writtenFormat == 'email') {
        response.redirect('/gb-telephony/v1/contact-details/alt-formats/email-reason')
    } else if (writtenFormat == 'pdf') {
        response.redirect('/gb-telephony/v1/contact-details/alt-formats/email-reason')
    }

})

// What size print do you need?
router.post('/gb-telephony/v1/contact-details/alt-formats/large-print', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/contact-details-summary')
})

// Why do you need us to contact you by email instead of printed letters?
router.post('/gb-telephony/v1/contact-details/alt-formats/email-reason', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/alt-formats/what-is-your-email')
})

// What is your email address?
router.post('/gb-telephony/v1/contact-details/alt-formats/what-is-your-email', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/contact-details-summary')
})

// What is your correspondence postcode page
router.post('/gb-telephony/v1/contact-details/correspondence-postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/confirm-correspondence-address')
})

// Confirm correspondence address > correspondence alt formats page
router.post('/gb-telephony/v1/contact-details/confirm-correspondence-address', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/alt-formats/written-format')
})

// Confirm correspondence address page
router.post('/gb-telephony/v1/contact-details/correspondence-enter-address-manually', function(request, response) {
    response.redirect('/gb-telephony/v1/contact-details/alt-formats/written-format')
})

// Contact details summary page
router.post('/gb-telephony/v1/contact-details/contact-details-summary', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-cd-done')
})

// -------------------------------------------------------------------------------------

//gb-telephony/v1/ADDITIONAL-SUPPORT

// -------------------------------------------------------------------------------------

//gb-telephony/v1/NATIONALITY

//MTP APRIL RELEASE - NATIONALITY
//gb-telephony/v1/nationality

//start
router.post('/gb-telephony/v1/nationality/start', function(request, response) {
    response.redirect('/gb-telephony/v1/nationality/what-is-your-nationality')
})

//what is your nationality
router.post('/gb-telephony/v1/nationality/what-is-your-nationality', function(request, response) {
    var nationality = request.session.data['nationality']
    if (nationality == 'british'){
        response.redirect('/gb-telephony/v1/nationality/uk-2-of-3-years')
    } else if (nationality == 'irish') {
        response.redirect('/gb-telephony/v1/nationality/uk-2-of-3-years')
    } else if (nationality == 'other') {
        response.redirect('/gb-telephony/v1/nationality/another-nationality')
    }
})

//Have you been in the UK for at least 2 of the last 3 years?
router.post('/gb-telephony/v1/nationality/uk-2-of-3-years', function(request, response) {
    var ukYears = request.session.data['uk-years']
    if (ukYears == 'yes'){
        response.redirect('/gb-telephony/v1/nationality/insurance-abroad')
    } else if (ukYears == 'no') {
        response.redirect('/gb-telephony/v1/nationality/insurance-abroad')
    } else if (ukYears == 'unsure') {
        response.redirect('/gb-telephony/v1/nationality/insurance-abroad')
    }
})

//Select other nationality
router.post('/gb-telephony/v1/nationality/another-nationality', function(request, response) {
    var anotherNationality = request.session.data['another-nationality']
    if (anotherNationality == 'Norway' || anotherNationality == 'Iceland'){
        response.redirect('/gb-telephony/v1/nationality/unhappy-path/nationality-types/living-in-uk-before')
    }
    if (anotherNationality == 'Australia' || anotherNationality == 'Brazil' || anotherNationality == 'Bangladesh' ){
        response.redirect('/gb-telephony/v1/nationality/uk-2-of-3-years')
    }
})

//Were you living in the UK on or before 31/12/20?
router.post('/gb-telephony/v1/nationality/unhappy-path/nationality-types/living-in-uk-before', function(request, response) {
    response.redirect('/gb-telephony/v1/nationality/uk-2-of-3-years')
})

//Are you working or paying national insurance in another country?

router.post('/gb-telephony/v1/nationality/insurance-abroad', function(request, response) {
    var payingInsurance= request.session.data['insurance-abroad']
    if (payingInsurance == 'no'){
      response.redirect('/gb-telephony/v1/nationality/benefits-abroad')
    } else if (payingInsurance == 'yes') {
        response.redirect('/gb-telephony/v1/nationality/benefits-abroad')
    }
  })

  // Are you receiving pensions or benefits in another country?
  router.post('/gb-telephony/v1/nationality/benefits-abroad', function(request, response) {
      var payingBenefits= request.session.data['benefits-abroad']
      if (payingBenefits == 'no'){
        response.redirect('/gb-telephony/v1/nationality/nationality-summary')
      } else if (payingBenefits == 'yes') {
          response.redirect('/gb-telephony/v1/nationality/nationality-summary')
      }
  })

        //What country are you receiving pensions or benefits in?
        router.post('/gb-telephony/v1/nationality/exportability/what-country-benefits', function(request, response) {
            response.redirect('/gb-telephony/v1/task-list-nat-done')
        })

    //Are any of your family members receiving pensions or benefits in another country?
    router.post('/gb-telephony/v1/nationality/exportability/family-receiving-benefits', function(request, response) {
        var payingBenefits= request.session.data['family-receiving-benefits']
        if (payingBenefits == 'no'){
        response.redirect('/gb-telephony/v1/task-list-nat-done')
        } else if (payingBenefits == 'yes') {
            response.redirect('/gb-telephony/v1/nationality/exportability/family-country-benefits')
        }
    })

    //What country are your family members receiving pensions or benefits in?
    router.post('/gb-telephony/v1/nationality/exportability/family-country-benefits', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-nat-done')
    })


//--------------------------------------------------------------------------------------------------------------
//nationality start
router.post('/gb-telephony/v1/nationality/start', function(request, response) {
    response.redirect('/gb-telephony/v1/nationality/what-is-your-nationality')
})

//what is your nationality
router.post('/gb-telephony/v1/nationality/what-is-your-nationality', function(request, response) {
    var nationality = request.session.data['nationality']
    if (nationality == 'british'){
        response.redirect('/gb-telephony/v1/nationality/what-country-do-you-live-in')
    } else if (nationality == 'irish') {
        response.redirect('/gb-telephony/v1/nationality/what-country-do-you-live-in')
    } else if (nationality == 'other') {
        response.redirect('/gb-telephony/v1/nationality/another-nationality')
    }
})

// Another nationality
router.post('/versions/devs/nationality/another-nationality', function(request, response) {
    response.redirect('/versions/devs/nationality/what-country-do-you-live-in')
})

//what country do you normally live in page
router.post('/versions/devs/nationality/what-country-do-you-live-in', function(request, response) {
    var nationality = request.session.data['country']
    if (nationality == 'northern-ireland'){
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'england') {
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'wales') {
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'scotland') {
        response.redirect('/versions/devs/nationality/lived-elsewhere')
    } else if (nationality == 'another-country') {
        response.redirect('/versions/devs/nationality/another-country-lived-in')
    }
})

// Another country
router.post('/versions/devs/another-country-lived-in', function(request, response) {
    response.redirect('/versions/devs/nationality/lived-elsewhere')
})


//Have you lived anywhere other than UK in last 3 years page
router.post('/versions/devs/nationality/lived-elsewhere', function(request, response) {
    var livedElsewhere = request.session.data['lived-elsewhere']
    if (livedElsewhere == 'yes'){
        response.redirect('#')
    } else if (livedElsewhere == 'no') {
        response.redirect('/versions/devs/nationality/abroad-over-four-weeks')
    }
})

//Have you been abroad for any periods over 4 weeks, in the last 3 years page
router.post('/versions/devs/nationality/abroad-over-four-weeks', function(request, response) {
    var livedAbroad = request.session.data['abroad-over-four-weeks']
    if (livedAbroad == 'yes'){
        response.redirect('#')
    } else if (livedAbroad == 'no') {
        response.redirect('/versions/devs/nationality/benefits-abroad')
    }
})

//benefits abroad
router.post('/versions/devs/nationality/benefits-abroad', function(request, response) {
    var benefitsAbroad = request.session.data['benefits-abroad']
    if (benefitsAbroad == 'yes'){
        response.redirect('/versions/devs/nationality/insurance-abroad')
    } else if (benefitsAbroad == 'no') {
        response.redirect('/versions/devs/nationality/insurance-abroad')
    }
})

//are you or a family member working or paying insurance from Switzerland or EEA?
router.post('/versions/devs/nationality/insurance-abroad', function(request, response) {
    var insuranceAbroad = request.session.data['insurance-abroad']
    if (insuranceAbroad == 'yes'){
        response.redirect('/versions/devs/nationality/nationality-summary')
    } else if (insuranceAbroad == 'no') {
        response.redirect('/versions/devs/nationality/nationality-summary')
    }
})

//summary to task list
router.post('/versions/devs/nationality/nationality-summary', function(request, response) {
    response.redirect('/versions/devs/task-list-nat-done')
})

// -------------------------------------------------------------------------------------

//gb-telephony/v1/HEALTHCARE-PROFESSIONAL

   //start ---> healthcare-prof-type
   router.post('/gb-telephony/v1/healthcare-professional/start', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/healthcare-prof-type')
})


//healthcare-prof-type ---> what is their postcode
router.post('/gb-telephony/v1/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/postcode')
})

//healthcare-prof-type ---> find address
router.post('/gb-telephony/v1/healthcare-professional/healthcare-prof-type', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/postcode')
})

//find address ---> select address
router.post('/gb-telephony/v1/healthcare-professional/postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/select-your-address')
})

//select address ---> addiitonal support needed
router.post('/gb-telephony/v1/healthcare-professional/select-your-address', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/additional-support-needed')
})

//enter-address-manually ----> second support needed?
router.post('/gb-telephony/v1/healthcare-professional/enter-address-manually', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/additional-support-needed')
})


//additional-support-needed ---> additional-support-type
router.post('/gb-telephony/v1/healthcare-professional/additional-support-needed', function(request, response) {
    var hcpTwoNeeded = request.session.data['support-needed']
    if (hcpTwoNeeded == 'yes'){
        response.redirect('/gb-telephony/v1/healthcare-professional/additional-support-type')
    } else if (hcpTwoNeeded == 'no') {
        response.redirect('/gb-telephony/v1/healthcare-professional/consent-NI')
    }
})

//additional-support-type ---> find address
router.post('/gb-telephony/v1/healthcare-professional/additional-support-type', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/postcode-support')
})

//find address ---> select address
router.post('/gb-telephony/v1/healthcare-professional/postcode-support', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/select-support-address')
})

//enter-address-manually ----> hospital and accom start
router.post('/gb-telephony/v1/healthcare-professional/support-address-manually', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/consent-NI')
})


//select support address ---> hospital and accom start
router.post('/gb-telephony/v1/healthcare-professional/select-support-address', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/consent-NI')
})

//consent NI ----> hcp cya 2 person
router.post('/gb-telephony/v1/healthcare-professional/consent-NI', function(request, response) {
    response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/hp-summary-two')
})

//---------------------------------------------------------------------------------
//gb-telephony/v1/HEALTHCARE-PROFESSIONAL/CYAS

//remove 2nd hcp
router.post('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-health-professional-2', function(request, response) {
    var removeHcp = request.session.data['remove-second-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/gb-telephony/v1/healthcare-professional/healthcare-prof-type')
    } else if (removeHcp == 'no'){
    response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-second-hcp')
}
})

//remove main hcp
router.post('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-health-professional', function(request, response) {
    var removeHcp = request.session.data['remove-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-main-hcp')
    } else if (removeHcp == 'no'){
    response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/hp-summary-two')
}
})

//remove final hcp
router.post('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-add-health-professional', function(request, response) {
    var removeHcp = request.session.data['remove-final-hcp']
    if (removeHcp == 'yes'){
        response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/add-new/healthcare-prof-type')
    } else if (removeHcp == 'no'){
    response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-main-hcp')
}
})


//add new hcp from remocving all contacts---> do you want to add another contact?
router.post('/gb-telephony/v1/healthcare-professional/hcp-cyas/add-new/additional-support-needed', function(request, response) {
    var removeHcp = request.session.data['support-needed']
    if (removeHcp == 'yes'){
        response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/add-new/additional-support-type')
    } else if (removeHcp == 'no'){
    response.redirect('/gb-telephony/v1/healthcare-professional/hcp-cyas/remove-second-hcp')
}
})

//----------------------------------------------------------------------------------
//gb-telephony/v1/ADDITIONAL-SUPPORT

router.post('/gb-telephony/v1/additional-support/start-info', function(request, response) {
    response.redirect('/gb-telephony/v1/additional-support/do-you-have-a-condition')
})

// do you have a condition
router.post('/gb-telephony/v1/additional-support/do-you-have-a-condition', function(request, response) {
    var anyCondition = request.session.data['any-condition']
    if (anyCondition == 'yes'){
        response.redirect('/gb-telephony/v1/additional-support/complete-forms')
    } else if (anyCondition == 'no') {
        response.redirect('/gb-telephony/v1/additional-support/advice-non-as-marker')
    }
})

// can you complete forms
router.post('/gb-telephony/v1/additional-support/complete-forms', function(request, response) {
    var forms = request.session.data['forms']
    var letters = request.session.data['letters']
    var post = request.session.data['post']
    if (forms == 'yes' && letters == 'yes' && post == 'yes') {
        response.redirect('/gb-telephony/v1/additional-support/advice-non-as-marker')
      } else if (forms == 'no' || letters == 'no' || post == 'no') {
        response.redirect('/gb-telephony/v1/additional-support/helpers')
      }
})

router.post('/gb-telephony/v1/additional-support/advice-non-as-marker', function(request, response) {
    response.redirect('/gb-telephony/v1/additional-support/add-support-summary')
})

router.post('/gb-telephony/v1/additional-support/read-letters', function(request, response) {
    response.redirect('/gb-telephony/v1/additional-support/post')
})

router.post('/gb-telephony/v1/additional-support/post', function(request, response) {
    response.redirect('/gb-telephony/v1/additional-support/helpers')
})

// Do you have anyone to help you?
router.post('/gb-telephony/v1/additional-support/helpers', function(request, response) {
    var anyoneHelp = request.session.data['helpers']
    if (anyoneHelp == 'yes'){
        response.redirect('/gb-telephony/v1/additional-support/who-helps')
    } else if (anyoneHelp == 'no') {
        response.redirect('/gb-telephony/v1/additional-support/advice-as-marker')
    }
})

router.post('/gb-telephony/v1/additional-support/who-helps', function(request, response) {
    response.redirect('/gb-telephony/v1/additional-support/advice-as-marker')
})

router.post('/gb-telephony/v1/additional-support/advice', function(request, response) {
    response.redirect('/gb-telephony/v1/additional-support/add-support-summary')
})
// -------------------------------------------------------------------------------------

//gb-telephony/v1/HOSPITAL-DATES

//hospital and accom start ----> Are you in hospital or hospice as an in-patient today?
router.post('/gb-telephony/v1/hospital-dates/5-1-why-we-need-details', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-2-today')
})
// Are you in hospital or hospice as an in-patient today?
router.post('/gb-telephony/v1/hospital-dates/5-2-today', function(request, response) {
    var hospitalToday = request.session.data['hospital-today']
    if (hospitalToday == 'yes-hospital'){
        response.redirect('/gb-telephony/v1/hospital-dates/5-4-yesterday')
    } else if (hospitalToday == 'no') {
        response.redirect('/gb-telephony/v1/hospital-dates/5-3-other-housing-today')
    } else if (hospitalToday == 'yes-hospice') {
        response.redirect('/gb-telephony/v1/hospital-dates/5-8-hospice-yesterday')
    }
})

// Were you in hospital yesterday?
router.post('/gb-telephony/v1/hospital-dates/5-4-yesterday', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-5-private-patient')
})


// are you a private patient? > What is the name and address of the hospital?
router.post('/gb-telephony/v1/hospital-dates/5-5-private-patient', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-6-postcode')
})

// postcode > select address
router.post('/gb-telephony/v1/hospital-dates/5-6-postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-7-select-hospital-address')
})

// postcode > select address
router.post('/gb-telephony/v1/hospital-dates/5-7-select-hospital-address', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/hospital-residence-summary')
})

// hospital manually > start bank
router.post('/gb-telephony/v1/hospital-dates/5-17-hospital-address-manually', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/hospital-residence-summary')
})

// hospice manually > start bank
router.post('/gb-telephony/v1/hospital-dates/5-18-hospice-address-manually', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/hospice-residence-summary')
})

// other manually > start bank
router.post('/gb-telephony/v1/hospital-dates/5-19-other-address-manually', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-accom-done')
})

// Were you in hospice yesterday?
router.post('/gb-telephony/v1/hospital-dates/5-8-hospice-yesterday', function(request, response) {
    var otherYesterday = request.session.data['hospice-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/gb-telephony/v1/hospital-dates/5-9-hospice-dates')
    } else if (otherYesterday == 'no') {
        response.redirect('/gb-telephony/v1/hospital-dates/5-10-hospice-postcode')
    }
})

// Do you know the date you went into the hospice?
router.post('/gb-telephony/v1/hospital-dates/5-9-hospice-dates', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-10-hospice-postcode')
})

// select hospice address
router.post('/gb-telephony/v1/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-11-select-hospice-address')
})

// select hospice address
router.post('/gb-telephony/v1/hospital-dates/5-10-hospice-postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-11-select-hospice-address')
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/gb-telephony/v1/hospital-dates/5-11-select-hospice-address', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/hospice-residence-summary')
})

// Are you living in a care home or nursing home, sheltered housing, a residential college or a hostel today?
router.post('/gb-telephony/v1//hospital-dates/5-3-other-housing-today', function(request, response) {
    var otherToday = request.session.data['other-today']
    if (otherToday == 'yes'){
        response.redirect('/gb-telephony/v1/hospital-dates/5-12-other-yesterday')
    } else if (otherToday == 'no') {
        response.redirect('/gb-telephony/v1/task-list-accom-done')
    }
})

// Were you living in this place yesterday?
router.post('/gb-telephony/v1/hospital-dates/5-12-other-yesterday', function(request, response) {
    var otherYesterday = request.session.data['other-yesterday']
    if (otherYesterday == 'yes'){
        response.redirect('/gb-telephony/v1/hospital-dates/5-15-other-postcode')
    } else if (otherYesterday == 'no') {
        response.redirect('/gb-telephony/v1/hospital-dates/5-15-other-postcode')
    }
})

//  Can you confirm the first line of the address place you are staying in?
router.post('/gb-telephony/v1/hospital-dates/5-15-other-postcode', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-16-select-other-address')
})

// Select other address > tasklist
router.post('/gb-telephony/v1/hospital-dates/5-16-select-other-address', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-13-third-party-pay')
})

// Does a local authority, health authority, Jobcentre Plus, or a charity pay any of the costs for you to live there?
router.post('/gb-telephony/v1/hospital-dates/5-13-third-party-pay', function(request, response) {
    var thirdPartyPay = request.session.data['third-party-pay']
    if (thirdPartyPay == 'health-trust'){
        response.redirect('/gb-telephony/v1/hospital-dates/5-23-name-local')
    } else if (thirdPartyPay == 'no') {
        response.redirect('/gb-telephony/v1/hospital-dates/other-residence-summary')
    } else if (thirdPartyPay == 'yes') {
        response.redirect('/gb-telephony/v1/hospital-dates/5-23-name')
    }
})

// What is the name of the [organisation type]?
router.post('/gb-telephony/v1/hospital-dates/5-23-name', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-accom-done')
})

// local auth ---> What is the name -----> agreement?
router.post('/gb-telephony/v1/hospital-dates/5-23-name-local', function(request, response) {
    response.redirect('/gb-telephony/v1/hospital-dates/5-14-local-agreement')
})

// agreement to task list
router.post('/gb-telephony/v1/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-accom-done')
})

// Do you have an agreement with the local authority to repay any of the costs?
router.post('/gb-telephony/v1/hospital-dates/hospital-dates/5-14-local-agreement', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-accom-done')
})


// other residence summary >  tasklist
router.post('/gb-telephony/v1/hospital-dates/hospital-dates/other-residence-summary', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-accom-done')
})

// -------------------------------------------------------------------------------------

//gb-telephony/v1/BANK-DETAILS/MAIN-ACCOUNT-DETAILS

// Can you give me your account details now?
router.post('/gb-telephony/v1/bank-details/6-1-start', function(request, response) {
    var detailsNow = request.session.data['details-now']
    if (detailsNow == 'yes'){
        response.redirect('/gb-telephony/v1/bank-details/6-3-main-account-details-v2')
    } else if (detailsNow == 'no') {
        response.redirect('/gb-telephony/v1/bank-details/6-2-no-details-now')
    }
})

// You can continue without entering account details
router.post('/gb-telephony/v1/bank-details/6-2-no-details-now', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-bank-done')
})

// Main account details
router.post('/gb-telephony/v1/bank-details/6-3-main-account-details-v2', function(request, response) {
    response.redirect('/gb-telephony/v1/bank-details/bank-details-summary')
})

// Bank details CYA to task list
router.post('/gb-telephony/v1/bank-details/bank-details-summary', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-bank-done')
})

//Motability to Motability CYA
router.post('/gb-telephony/v1/motability/motability', function(request, response) {
    response.redirect('/gb-telephony/v1/task-list-motability-done')
})

//Motability to Motability CYA
router.post('/gb-telephony/v1/task-list-motability-done', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/what-happens-next')
})

// -------------------------------------------------------------------------------------

// Save application- i will now submit
router.post('/gb-telephony/v1/what-happens-next/save-application', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/what-happens-next')
})
//design-updates/sprint-20/what-happens-next/what-happens-next
router.post('/gb-telephony/v1/what-happens-next/what-happens-next', function(request, response) {
    var previousOnline = request.session.data['previous-online-claim']
    if (previousOnline  == 'yes'){
        response.redirect('/gb-telephony/v1/what-happens-next/paper-whn-1')
    } else if (previousOnline  == 'no') {
        response.redirect('/gb-telephony/v1/what-happens-next/online-form-option')
    }
})

router.post('/gb-telephony/v1/what-happens-next/online-form-option', function(request, response) {
    var previousOnline = request.session.data['form-online']
    if (previousOnline  == 'online'){
        response.redirect('/gb-telephony/v1/what-happens-next/online-form-contact')
    } else if (previousOnline  == 'paper') {
        response.redirect('/gb-telephony/v1/what-happens-next/paper-whn-1')
    }
})

// Online whn1 (form contact details)
router.post('/gb-telephony/v1/what-happens-next/online-form-contact', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/online-whn-1')
})

// Online whn 1- whn 2
router.post('/gb-telephony/v1/what-happens-next/online-whn-1', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/online-whn-2')
})

// Online whn 2- paper-after-sent
router.post('/gb-telephony/v1/what-happens-next/online-whn-2', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/after-form-sent')
})

router.post('/gb-telephony/v1/what-happens-next/previously-claimed-online', function(request, response) {
        response.redirect('/gb-telephony/v1/what-happens-next/paper-whn-1')
})

// Paper whn 1- whn 2
router.post('/gb-telephony/v1/what-happens-next/paper-whn-1', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/paper-whn-2')
})

// Paper whn 2- paper-after-sent
router.post('/gb-telephony/v1/what-happens-next/paper-whn-2', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/after-form-sent')
})

// After-form-sent > end claim and clear session
router.post('/gb-telephony/v1/what-happens-next/after-form-sent', function(request, response) {
    response.redirect('/gb-telephony/v1/what-happens-next/application-submitted')
})

// -------------------------------------------------------------------------------------



// IGNORE BELOW THIS LINE

//routing for activities screen
router.post('/select-activities-router', function(req, res, next){

const selectActivity = req.session.data['daily-activity']

  if (selectActivity == 'prep-food') {
    res.redirect('/sprint-1/preparing-food/choose-method')
  }
  if (selectActivity == 'dressing') {
    res.redirect('/sprint-1/dressing/choose-method')
  }
  if (selectActivity == 'moving-around') {
    res.redirect('/sprint-1/moving-around/choose-method')
  }

  else {
    res.redirect('/sprint-1/preparing-food/choose-method')
  }
})

//routing for choose method prep food screen
router.post('/choose-method-router', function(req, res, next){

    const chooseMethod = req.session.data['choose-method-preparing-food']

      if (chooseMethod == 'nhs') {
        res.redirect('/sprint-1/ask-nhs/preparing-food')
      }
      if (chooseMethod == 'someone-i-know') {
        res.redirect('/sprint-1/vouch-for-me/preparing-food')
      }
      if (chooseMethod == 'diary') {
        res.redirect('/sprint-1/preparing-food/diary/good/problems-prep-food')
      }

      else {
        res.redirect('/sprint-1/preparing-food/choose-method')
      }
    })

  //routing for choose method dressing screen
router.post('/choose-method-dressing-router', function(req, res, next){

  const chooseMethod = req.session.data['choose-method-dressing']

    if (chooseMethod == 'nhs') {
      res.redirect('/sprint-1/ask-nhs/dressing')
    }
    if (chooseMethod == 'someone-i-know') {
      res.redirect('/sprint-1/vouch-for-me/dressing')
    }
    if (chooseMethod == 'diary') {
      res.redirect('/sprint-1/dressing/diary/good/problems-dressing')
    }

    else {
      res.redirect('/sprint-1/dressing/choose-method')
    }
  })

  //routing for choose method moving around screen
  router.post('/choose-method-moving-around-router', function(req, res, next){

    const chooseMethod = req.session.data['choose-method-moving-around']

      if (chooseMethod == 'nhs') {
        res.redirect('/sprint-1/ask-nhs/moving-around')
      }
      if (chooseMethod == 'someone-i-know') {
        res.redirect('/sprint-1/vouch-for-me/moving-around')
      }
      if (chooseMethod == 'diary') {
        res.redirect('/sprint-1/moving-around/diary/good/problems-moving-around')
      }

      else {
        res.redirect('/sprint-1/moving-around/choose-method')
      }
    })

//routing for how to contact screen
router.post('/how-contact-router', function(req, res, next){

    const howContact = req.session.data['how-contact']

      if (howContact == 'email') {
        res.redirect('/sprint-1/vouch-for-me/email')
      }
      if (howContact == 'phone') {
        res.redirect('/sprint-1/vouch-for-me/phone')
      }
      if (howContact == 'text') {
        res.redirect('/sprint-1/vouch-for-me/mobile')
      }
      if (howContact == 'letter') {
        res.redirect('/sprint-1/vouch-for-me/address')
      }

      else {
        res.redirect('/sprint-1/vouch-for-me/email')
      }
    })

//DIARY ROUTES

//GOOD DAY

//GOOD DAY PREP FOOD

//routing for food prep problems on a good day screen
router.post('/good-problems-prep-food-router', function(req, res, next){

    const problemsFoodGood = req.session.data['problems-food']

      if (problemsFoodGood == 'good-pain') {
        res.redirect('/sprint-1/preparing-food/diary/good/pain-preparing-food')
      }
      if (problemsFoodGood == 'tired') {
        res.redirect('/sprint-1/preparing-food/diary/good/pain-preparing-food')
      }
      if (problemsFoodGood == 'good-hurt') {
        res.redirect('/sprint-1/preparing-food/diary/good/hurt-preparing-food')
      }

      if (problemsFoodGood == 'good-supervision') {
        res.redirect('/sprint-1/preparing-food/diary/good/supervision-preparing-food')
      }
      if (problemsFoodGood == 'good-help') {
        res.redirect('/sprint-1/preparing-food/diary/good/supervision-preparing-food')
      }

      if (problemsFoodGood == 'good-reminder') {
        res.redirect('/sprint-1/preparing-food/diary/good/reminder-preparing-food')
      }
      if (problemsFoodGood == 'good-unable') {
        res.redirect('/sprint-1/preparing-food/diary/good/unable-preparing-food')
      }

      else {
        res.redirect('/sprint-1/preparing-food/diary/good/pain-preparing-food')
      }
    })

//GOOD DAY DRESS AND UNDRESS

//routing for dressing problems on a good day screen
router.post('/good-problems-dressing-router', function(req, res, next){

  const problemsDressingGood = req.session.data['problems-dressing']

    if (problemsDressingGood == 'good-pain') {
      res.redirect('/sprint-1/dressing/diary/good/pain-dressing')
    }
    if (problemsDressingGood == 'good-tired') {
      res.redirect('/sprint-1/dressing/diary/good/pain-dressing')
    }
    if (problemsDressingGood == 'good-hurt') {
      res.redirect('/sprint-1/dressing/diary/good/hurt-dressing')
    }

    if (problemsDressingGood == 'good-supervision') {
      res.redirect('/sprint-1/dressing/diary/good/supervision-dressing')
    }
    if (problemsDressingGood == 'good-help') {
      res.redirect('/sprint-1/dressing/diary/good/supervision-dressing')
    }

    if (problemsDressingGood == 'good-reminder') {
      res.redirect('/sprint-1/dressing/diary/good/reminder-dressing')
    }
    if (problemsDressingGood == 'good-unable') {
      res.redirect('/sprint-1/dressing/diary/good/unable-dressing')
    }

    else {
      res.redirect('/sprint-1/dressing/diary/good/pain-dressing')
    }
  })

//GOOD DAY MOVE AROUND

//routing for moving-around problems on a good day screen
router.post('/good-problems-moving-around-router', function(req, res, next){

  const problemsMovingAroundGood = req.session.data['problems-moving-around']

    if (problemsMovingAroundGood == 'good-pain') {
      res.redirect('/sprint-1/moving-around/diary/good/pain-moving-around')
    }
    if (problemsMovingAroundGood == 'good-tired') {
      res.redirect('/sprint-1/moving-around/diary/good/pain-moving-around')
    }
    if (problemsMovingAroundGood == 'good-hurt') {
      res.redirect('/sprint-1/moving-around/diary/good/hurt-moving-around')
    }

    if (problemsMovingAroundGood == 'good-supervision') {
      res.redirect('/sprint-1/moving-around/diary/good/supervision-moving-around')
    }
    if (problemsMovingAroundGood == 'good-help') {
      res.redirect('/sprint-1/moving-around/diary/good/supervision-moving-around')
    }

    if (problemsMovingAroundGood == 'good-reminder') {
      res.redirect('/sprint-1/moving-around/diary/good/reminder-moving-around')
    }
    if (problemsMovingAroundGood == 'good-unable') {
      res.redirect('/sprint-1/moving-around/diary/good/unable-moving-around')
    }

    else {
      res.redirect('/sprint-1/moving-around/diary/good/pain-moving-around')
    }
  })

//BAD DAY

//BAD DAY PREP FOOD

//routing for food prep problems on a bad day screen
router.post('/bad-problems-prep-food-router', function(req, res, next){

    const problemsFoodBad = req.session.data['problems-food']

      if (problemsFoodBad == 'bad-pain') {
        res.redirect('/sprint-1/preparing-food/diary/bad/pain-preparing-food')
      }
      if (problemsFoodBad == 'bad-tired') {
        res.redirect('/sprint-1/preparing-food/diary/bad/pain-preparing-food')
      }
      if (problemsFoodBad == 'bad-hurt') {
        res.redirect('/sprint-1/preparing-food/diary/bad/hurt-preparing-food')
      }

      if (problemsFoodBad == 'bad-supervision') {
        res.redirect('/sprint-1/preparing-food/diary/bad/supervision-preparing-food')
      }
      if (problemsFoodBad == 'bad-help') {
        res.redirect('/sprint-1/preparing-food/diary/bad/supervision-preparing-food')
      }

      if (problemsFoodBad == 'bad-reminder') {
        res.redirect('/sprint-1/preparing-food/diary/bad/reminder-preparing-food')
      }
      if (problemsFoodBad == 'bad-unable') {
        res.redirect('/sprint-1/preparing-food/diary/bad/unable-preparing-food')
      }

      else {
        res.redirect('/sprint-1/preparing-food/diary/bad/pain-preparing-food')
      }
    })

//BAD DAY DRESSING

//routing for dressing problems on a bad day screen
router.post('/bad-problems-dressing-router', function(req, res, next){

  const problemsDressingBad = req.session.data['problems-dressing']

    if (problemsDressingBad == 'bad-pain') {
      res.redirect('/sprint-1/dressing/diary/bad/pain-dressing')
    }

    if (problemsDressingBad == 'bad-tired') {
      res.redirect('/sprint-1/dressing/diary/bad/pain-dressing')
    }
    if (problemsDressingBad == 'bad-hurt') {
      res.redirect('/sprint-1/dressing/diary/bad/hurt-dressing')
    }

    if (problemsDressingBad == 'bad-supervision') {
      res.redirect('/sprint-1/dressing/diary/bad/supervision-dressing')
    }
    if (problemsDressingBad == 'bad-help') {
      res.redirect('/sprint-1/dressing/diary/bad/supervision-dressing')
    }

    if (problemsDressingBad == 'bad-reminder') {
      res.redirect('/sprint-1/dressing/diary/bad/reminder-dressing')
    }
    if (problemsDressingBad == 'bad-unable') {
      res.redirect('/sprint-1/dressing/diary/bad/unable-dressing')
    }

    else {
      res.redirect('/sprint-1/dressing/diary/bad/pain-dressing')
    }
  })

//BAD DAY MOVING AROUND

//routing for moving around problems on a bad day screen
router.post('/bad-problems-moving-around-router', function(req, res, next){

  const problemsMovingBad = req.session.data['problems-moving-around']

    if (problemsMovingBad == 'bad-pain') {
      res.redirect('/sprint-1/moving-around/diary/bad/pain-moving-around')
    }
    if (problemsMovingBad == 'bad-tired') {
      res.redirect('/sprint-1/moving-around/diary/bad/pain-moving-around')
    }
    if (problemsMovingBad == 'bad-hurt') {
      res.redirect('/sprint-1/moving-around/diary/bad/hurt-moving-around')
    }

    if (problemsMovingBad == 'bad-supervision') {
      res.redirect('/sprint-1/moving-around/diary/bad/supervision-moving-around')
    }
    if (problemsMovingBad == 'bad-help') {
      res.redirect('/sprint-1/moving-around/diary/bad/supervision-moving-around')
    }

    if (problemsMovingBad == 'bad-reminder') {
      res.redirect('/sprint-1/moving-around/diary/bad/reminder-moving-around')
    }
    if (problemsMovingBad == 'bad-unable') {
      res.redirect('/sprint-1/moving-around/diary/bad/unable-moving-around')
    }

    else {
      res.redirect('/sprint-1/moving-around/diary/bad/pain-moving-around')
    }
  })

  // hypothesis 1 v1 routes

  //activity selector routing

  router.post('/daily-activity-select', function(req, res, next){

    const dailyActivityCheck = req.session.data['daily-activity']

      if (dailyActivityCheck == 'work') {
        res.redirect('/h1/it1/v1/work-support')
      }
      if (dailyActivityCheck == 'travel') {
        res.redirect('/h1/it1/v1/travel-support')
      }
      if (dailyActivityCheck == 'shopping') {
        res.redirect('/h1/it1/v1/shopping-support')
      }
      if (dailyActivityCheck == 'housework') {
        res.redirect('/h1/it1/v1/housework-support')
      }
      if (dailyActivityCheck == 'medical-appointments') {
        res.redirect('/h1/it1/v1/medical-support')
      }
      if (dailyActivityCheck == 'prepare-meals') {
        res.redirect('/h1/it1/v1/food-support')
      }
      if (dailyActivityCheck == 'budgeting') {
        res.redirect('/h1/it1/v1/budgeting-support')
      }
      else {
        res.redirect('/h1/it1/v1/none')
      }
    })

            // work

            router.post('/work-router', function(req, res, next){

              const workCheck = req.session.data['work-help']

                if (workCheck == 'need-help') {
                  res.redirect('/h1/it1/v1/work-help')
                }
                if (workCheck == 'use-aids') {
                  res.redirect('/h1/it1/v1/work-aids')
                }
                else {
                  res.redirect('/h1/it1/v1/food-support')
                }
              })

 // travel

    router.post('/travel-router', function(req, res, next){

      const travelCheck = req.session.data['travel-help']

        if (travelCheck == 'need-help') {
          res.redirect('/h1/it1/v1/travel-help')
        }
        if (travelCheck == 'use-aids') {
          res.redirect('/h1/it1/v1/travel-aids')
        }
        else {
          res.redirect('/h1/it1/v1/shopping-support')
        }
      })


      // shopping


    router.post('/shopping-router', function(req, res, next){

      const shoppingCheck = req.session.data['shopping-help']

        if (shoppingCheck == 'need-help') {
          res.redirect('/h1/it1/v1/shopping-help')
        }
        if (shoppingCheck == 'use-aids') {
          res.redirect('/h1/it1/v1/shopping-aids')
        }
        else {
          res.redirect('/h1/it1/v1/housework-support')
        }
      })


      // housework


    router.post('/housework-router', function(req, res, next){

      const houseworkCheck = req.session.data['housework-help']

        if (houseworkCheck == 'need-help') {
          res.redirect('/h1/it1/v1/housework-help')
        }
        if (houseworkCheck == 'use-aids') {
          res.redirect('/h1/it1/v1/housework-aids')
        }
        else {
          res.redirect('/h1/it1/v1/medical-support')
        }
      })


        // medical appointments


      router.post('/medical-router', function(req, res, next){

        const medicalCheck = req.session.data['medical-help']

          if (medicalCheck == 'need-help') {
            res.redirect('/h1/it1/v1/medical-help')
          }
          if (medicalCheck == 'use-aids') {
            res.redirect('/h1/it1/v1/medical-aids')
          }
          else {
            res.redirect('/h1/it1/v1/work-support')
          }
        })




    // preparing food



          router.post('/food-router', function(req, res, next){

            const workCheck = req.session.data['food-help']

              if (workCheck == 'need-help') {
                res.redirect('/h1/it1/v1/food-help')
              }
              if (workCheck == 'use-aids') {
                res.redirect('/h1/it1/v1/food-aids')
              }
              else {
                res.redirect('/h1/it1/v1/budgeting-support')
              }
            })

    // budgeting



    router.post('/budgeting-router', function(req, res, next){

    const budgetingCheck = req.session.data['budgeting-help']

      if (budgetingCheck == 'need-help') {
        res.redirect('/h1/it1/budgeting-help')
      }
      if (budgetingCheck == 'use-aids') {
        res.redirect('/h1/it1/budgeting-aids')
      }
      else {
        res.redirect('/h1/it1/cya')
      }
    })


  // v2 routes

  // travelling

  router.get(/travelSelect/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('travel-support')
    }
    else {
        res.redirect('travel-no')
    }
})

router.post('/travel-how-router', function(req, res, next){

  const travelCheck = req.session.data['travel-help']

    if (travelCheck == 'need-help') {
      res.redirect('/h1/it1/travel-help')
    }
    if (travelCheck == 'use-aids') {
      res.redirect('/h1/it1/travel-aids')
    }
    else {
      res.redirect('/h1/it1/shopping')
    }
  })


  // shopping

  router.get(/shoppingSelect/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('shopping-support')
    }
    else {
        res.redirect('shopping-no')
    }
})

router.post('/shopping-how-router', function(req, res, next){

  const shoppingCheck = req.session.data['shopping-help']

    if (shoppingCheck == 'need-help') {
      res.redirect('/h1/it1/shopping-help')
    }
    if (shoppingCheck == 'use-aids') {
      res.redirect('/h1/it1/shopping-aids')
    }
    else {
      res.redirect('/h1/it1/housework')
    }
  })


  // housework

  router.get(/houseworkSelect/ , function (req, res) {
    if (req.query.radioGroup === "yes") {
        res.redirect('housework-support')
    }
    else {
        res.redirect('housework-no')
    }
})

router.post('/housework-how-router', function(req, res, next){

  const houseworkCheck = req.session.data['housework-help']

    if (houseworkCheck == 'need-help') {
      res.redirect('/h1/it1/housework-help')
    }
    if (houseworkCheck == 'use-aids') {
      res.redirect('/h1/it1/housework-aids')
    }
    else {
      res.redirect('/h1/it1/medical-appts')
    }
  })


    // medical appointments

    router.get(/medicalApptsSelect/ , function (req, res) {
      if (req.query.radioGroup === "yes") {
          res.redirect('medical-support')
      }
      else {
          res.redirect('medical-no')
      }
  })

  router.post('/medical-how-router', function(req, res, next){

    const medicalCheck = req.session.data['medical-help']

      if (medicalCheck == 'need-help') {
        res.redirect('/h1/it1/medical-help')
      }
      if (medicalCheck == 'use-aids') {
        res.redirect('/h1/it1/medical-aids')
      }
      else {
        res.redirect('/h1/it1/work')
      }
    })

        // work

        router.get(/workSelect/ , function (req, res) {
          if (req.query.radioGroup === "yes") {
              res.redirect('work-support')
          }
          else {
              res.redirect('work-no')
          }
      })

      router.post('/work-how-router', function(req, res, next){

        const workCheck = req.session.data['work-help']

          if (workCheck == 'need-help') {
            res.redirect('/h1/it1/work-help')
          }
          if (workCheck == 'use-aids') {
            res.redirect('/h1/it1/work-aids')
          }
          else {
            res.redirect('/h1/it1/food')
          }
        })


// preparing food

        router.get(/foodSelect/ , function (req, res) {
          if (req.query.radioGroup === "yes") {
              res.redirect('food-support')
          }
          else {
              res.redirect('food-no')
          }
      })

      router.post('/food-how-router', function(req, res, next){

        const workCheck = req.session.data['food-help']

          if (workCheck == 'need-help') {
            res.redirect('/h1/it1/food-help')
          }
          if (workCheck == 'use-aids') {
            res.redirect('/h1/it1/food-aids')
          }
          else {
            res.redirect('/h1/it1/budgeting')
          }
        })

// budgeting

router.get(/budgetingSelect/ , function (req, res) {
  if (req.query.radioGroup === "yes") {
      res.redirect('budgeting-support')
  }
  else {
      res.redirect('budgeting-no')
  }
})

router.post('/budgeting-how-router', function(req, res, next){

const budgetingCheck = req.session.data['budgeting-help']

  if (budgetingCheck == 'need-help') {
    res.redirect('/h1/it1/budgeting-help')
  }
  if (budgetingCheck == 'use-aids') {
    res.redirect('/h1/it1/budgeting-aids')
  }
  else {
    res.redirect('/h1/it1/cya')
  }
})
