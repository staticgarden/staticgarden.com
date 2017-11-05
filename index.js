$(function() {
  'use strict'

  const URL = "https://xro5cjzrnk.execute-api.us-east-1.amazonaws.com/prod/request"

  const schedule = $("#schedule"),
    scheduleForm = schedule[0];

  const isEmpty = (x) => (x || "").toString().trim().length == 0
  const attrs = ["url", "method", "email", "recaptchaResponse"]
  const getRequest = () => {

    const req = {
      url: scheduleForm.url.value,
      method: scheduleForm.method.value,
      email: scheduleForm.email.value,
      recaptchaResponse: scheduleForm['g-recaptcha-response'].value
    };

    const errors =
      attrs
      .map(attr => isEmpty(req[attr]) ? `${attr} cannot be empty` : null)
      .filter(x => x)

    if (errors.length != 0) {
      return {
        errors: errors
      }
    }

    return req
  }

  schedule.on("submit", (e) => {
    e.preventDefault()

    const req = getRequest()

    if (req.errors) {
      alert(`Please correct the following errors: \n${req.errors.join("\n")}`)
      return false
    }

    $.ajax({
      url: URL,
      method: 'POST',
      contentType: 'application/json', // request
      dataType: 'json', // response
      data: JSON.stringify(req),
      success: function(data, textStatus, jqXHR) {
        alert("Successfully scheduled your url to be requested daily")
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("An error occured, please try again")
      }
    })

    return false;
  })

})

