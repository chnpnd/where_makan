<template>
     <form> 
        <div class="container"> 
            <h3 class="text-center" style="margin-bottom:10px;"> Edit Your Profile Information </h3> 
            <div class="row" id="username"> 
                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> Username </label> 
                   <input type="text" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>
            </div>

            <div class="row" id="password"> 
                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> Current Password </label> 
                   <input type="text" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>

                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> New Password </label> 
                   <input type="text" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>

                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> Confirm Password </label> 
                   <input type="text" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>
            </div>
            
            <div class="row" id="dob"> 
                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> Date of Birth </label> 
                   <input type="date" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>
            </div>

            <div class="row" id="phone"> 
                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> Phone Number </label> 
                   <input type="tel" pattern="[0-9]{8}" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>
            </div>

            <div class="row" id="Address"> 
                <div class="col form-group"> 
                   <label class="fw-bold" style="color: purple"> Address </label> 
                   <input type="text" class="form-control" placeholder="Should reflect from Swagger.io"> 
                </div>
            </div> 

            <div class = "row">
                &nbsp;
            </div>
            
            <div class="row"> 
                <div class = "col"></div>
                <button type="button" class="btn btn-outline-primary text center col">Save Edits</button>
                <div class = "col"></div>
            </div>
        </div> 

     </form> 

    
</template>

<script>

//should take the new form values and update them to swagger with the post function

</script>

<style>
form {
    padding: 20px;
}

.row {
    padding: 10px;
}

</style>