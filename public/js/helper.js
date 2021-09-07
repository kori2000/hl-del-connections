/**
 * Return controller cloud agent status
 */
function getServerStatus() {

  let agent_label = document.getElementById("agent_label")
  let agent_status = document.getElementById("agent_status")

  fetch(`/status`).then( res => res.json()).then( jsonData => {
    agent_label.innerHTML = `${jsonData.label} v${jsonData.version}`
    agent_status.innerHTML = "CONNECTED"
    agent_status.className = "badge badge-success"
    // console.log(jsonData)
  }).catch(err => {
    agent_label.innerHTML = "NO AGENT"
    agent_status.innerHTML = "OFFLINE"
    agent_status.className = "badge badge-danger"
  })

}

function delete_all_connection() {


  let confirm_delete_all_conn = confirm("Are you sure to delete all connections 🔥");
  if (confirm_delete_all_conn) {

    fetch('/connections').then( res => res.json()).then( jsonData => {

      console.log("ALL CONNECTIONS", jsonData)
      let connectionList = jsonData.results
      
      for (let index = 0; index < connectionList.length; index++) {
        const element = connectionList[index]

        let conn_id_value = element.connection_id

        setTimeout(function() { 

          fetch(`/delete-connection/${conn_id_value}`).then( res => {
            if (res.status == 200) {
              connection_id.value = ""
              showDelConBox(conn_id_value)
              
            } else {
              showDelConBoxFail(conn_id_value)
            }
          })

        }, 700)

      }  

    })

  }

}

/**
 * Delete selected connection
 */
function delete_connection() {
  
  // Replace tags againts injections
  let connection_id = document.getElementById("connection_id")
  let conn_id_value = connection_id.value.replace(/(<([^>]+)>)/gi, "")
    
  fetch(`/delete-connection/${conn_id_value}`).then( res => {

    if (res.status == 200) {
      connection_id.value = ""
      showDelConBox(conn_id_value)
      
    } else {
      showDelConBoxFail(conn_id_value)
    }

  })

}

/**
 * Display Info Box: Deleted Connection ID
 * @param {} connection_id 
 */
function showDelConBox(connection_id) {
  let del_con_box = document.getElementById("del_con_box")
  let del_con_id = document.getElementById("del_con_id")

  del_con_box.style.visibility = "visible"

  del_con_id.innerHTML = connection_id

  fadeIn(del_con_box)

  setTimeout(function() {
    fadeOut(del_con_box)
  }, 3000)
}

function showDelConBoxFail(connection_id) {
  let del_con_box = document.getElementById("del_con_box_err")
  let del_con_id = document.getElementById("del_con_id_err")

  del_con_box.style.visibility = "visible"

  del_con_id.innerHTML = connection_id

  fadeIn(del_con_box)

  setTimeout(function() {
    fadeOut(del_con_box)
  }, 3000)
}

// fade out
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}
// fade in
function fadeIn(el){
  el.style.opacity = 0;
  el.style.display = "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    } 
  })();
}