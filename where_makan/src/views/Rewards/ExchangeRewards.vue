<template>
    <h1>Exchange Points for Rewards here!</h1>

    <!--Rewards should populate itself base on the rewards database-->

    <div class = "container-fluid rewards">
        <div class = "row">
        
            <div class = "col-2"></div>

            <div class = "col-8">

                <div class = "row border border-primary rounded bg-light">

                    <div class = "col-3 rewardImage ">
                        <img src="" class="img-fluid" alt="Reward Image">
                    </div>
                    
                    <div class = "col-6 rewardDesc">
                        <h3>Rewards Name</h3>
                        <p>Reward Description ........................</p>
                        <p>Terms and Condition</p>
                        <p class="text-warning">300 (Points required to redeem)</p>
                    </div>

                    <div class = "col-3 exchangeButton text-center">
                        <button type="button" @click="exchangeReward()" class="btn btn-outline-primary btn-block text-center span">Redeem</button>
                    </div>

                </div>
            </div>

            <div class = "col-2"></div>


        </div>
    </div>
</template>

<script>

</script>

<style>

rewards.row {
    border: 1px solid;
    border-radius: 10px;
}

</style>