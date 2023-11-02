<template>
     <div class="container bg-white">
        <div class="row">
            <div class="col-4">
                <div class="container">
                    <div class="row">
                        <router-link to="/analytics" class="btn btn-outline-primary btn-lg">View Online Sales Analytics</router-link>
                    </div>

                    <button type="button" class="btn btn-primary">Check reviews</button>
                 </div>
             </div>

            <div class="col">
                <div class="row">
                    <div class="col">
                        <img class="img-thumbnail w-100 h-100" src="src/assets/profile_img.jpeg">
                    </div>

                    <div class="col text-center pt-10">
                        <h3>Rodger Mok</h3>
                        <router-link to="/editprofile" class="btn btn-outline-primary btn-lg">Edit Profile</router-link>
                    </div>

                    <hr>
                </div>
               
            </div>
        </div>

      <div> <hr> </div>

    <div class="container bg-white">
        <div class="row">
            <div class="col-4">
                <div class="container">
                    <div class="row">
                        <router-link to="/myrewards" class="btn btn-outline-primary btn-lg">My Rewards</router-link>
                    </div>

                    <div class="row">
                        <router-link to="/exchangerewards" class="btn btn-outline-primary btn-lg">Exchange Points for Rewards</router-link>
                    </div>

                  <button type="button" class="btn btn-primary">Favourited Stalls</button>


                   <button type="button" class="btn btn-primary">Past orders</button>

                    
                </div>

            </div>

            <div class="col">
                <div class="row">
                    <div class="col">
                        <img class="img-thumbnail w-100 h-100" src="src/assets/profile_img.jpeg">
                    </div>

                    <div class="col text-center pt-10">
                        <h3>Alice Low</h3>
                        <router-link to="/editprofile" class="btn btn-outline-primary btn-lg">Edit Profile</router-link>
                    </div>

                    <hr>
                </div>
               
            </div>
        </div>
      </div>
</template>
  
<script>
  
</script>


<style>

h1 {
    text-align: center;
}

</style>

