<template>
    <div>
<!--<h1>My Rewards</h1>

    <div class = "container-fluid rewards">
        <div class = "row" v-for="reward in rewardOwn" :key="reward.id">
        
            <div class = "col-2"></div>

            <div class = "col-8">

                <div class = "row border border-primary rounded bg-light">

                    <div class = "col-1 rewardDesc">

                    </div>
                    
                    <div class = "col-8 rewardDesc">
                        <h3>{{ reward.item_id }}</h3>
                        <p>Terms and Condition Apply</p>
                        <p class="text-muted">Valid till 31 Dec 2023 </p>
                    </div>

                    <div class = "col-3 exchangeButton text-center">
                        <button type="button" @click="useReward()" class="btn btn-outline-primary btn-block text-center span">Use Now</button>
                    </div>

                </div>
            </div>

            <div class = "col-2"></div>


        </div>
    </div>
-->
    <h1>Exchange Points for Rewards here!</h1>

    <!--Rewards should populate itself base on the rewards database-->

    <div class="container-fluid rewards">
        <div class="row" v-for="(item, index) in rewardExchange" :key="item.name">
            <div class="col-2"></div>
            <div class="col-8">
                <div class="row border border-primary rounded bg-light">
                    <div class="col-1 rewardDesc"></div>
                    <div class="col-8 rewardDesc">
                        <h3>{{ item.name }}</h3>
                        <p>Terms and Condition Apply</p>
                        <p class="text-warning">{{ item.cost }} (Points required to redeem)</p>
                    </div>
                    <div class="col-3 exchangeButton text-center">
                        <button type="button" @click="editRewards(item)" :disabled="isButtonDisabled[index]" class="btn btn-outline-primary btn-block text-center span">
                            <p>{{ rewardStatus[index] }}</p>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</div>
</template>

<script>
import auth from '../../auth';

export default {
    data() {
      return {
        consumer_id: -1,
        points: [],
        rewardOwn: [],
        rewardExchange: [],
        // points: [],
        // rewardOwn: [], //consumer_id, item_id, date
        // rewardExchange: [],
        // claimed, can claim, not enough points to claim
        rewardStatus: [],
        isButtonDisabled: [],
      };
    },
    async created() {
      // Fetch center details based on the centerId prop
      //this.getPoints();
      //this.getRewardOwn();
      //this.getRewardExchange();
      await this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const userInfo = await auth.getUser();
                if (userInfo && userInfo.id) {
                    this.consumer_id = userInfo.id;
                    await this.fetchInitialData();
                } else {
                // Handle the scenario where there is no logged-in user
                console.error('User is not logged in');
                // Redirect the user to the login page or display a message
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        async fetchInitialData() {
            // Fetch points and rewards data after consumer_id is available
            await Promise.all([
                this.getPoints(),
                this.getRewardOwn(),
                this.getRewardExchange(),
            ]);
            this.checkRewardStatus();
            },
        async getPoints() {
            const fetchFromAPI = async (url) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error("Failed to fetch data");
                    return await response.json();
                } catch (error) {
                    console.error("An error occurred while fetching data:", error);
                }
            };
            this.points = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Point/api/get/${this.consumer_id}/point`);
        },
        async getRewardOwn() {
            const fetchFromAPI = async (url) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error("Failed to fetch data");
                    return await response.json();
                } catch (error) {
                    console.error("An error occurred while fetching data:", error);
                }
            };
            this.rewardOwn = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Reward/api/get/rewards`);
        },

        async getRewardExchange() {
            const fetchFromAPI = async (url) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error("Failed to fetch data");
                    return await response.json();
                } catch (error) {
                    console.error("An error occurred while fetching data:", error);
                }
            };
            this.rewardExchange = await fetchFromAPI(`https://stingray-app-4wa63.ondigitalocean.app/Reward/api/get/item`);
        },

        checkRewardStatus(){
            //check if rewards is owned
            for (let i = 0; i<this.rewardExchange.length; i++){
                var rewardItem = this.rewardExchange[i];
                if (this.rewardOwn.length <= 0){
                    this.rewardStatus.push("no");
                }
                else {
                    for (let x = 0; x<this.rewardOwn.length; x++){
                        var myReward = this.rewardOwn[x];
                        if (myReward.reward_name == rewardItem.name){
                            this.rewardStatus.push("Redeemed");
                            this.isButtonDisabled.push(true);
                        }
                        else if (this.points[0].point >= rewardItem.cost){
                            this.rewardStatus.push("Redeem");
                            this.isButtonDisabled.push(false);
                        }
                        else{
                            this.rewardStatus.push("Not Enough Points");
                            this.isButtonDisabled.push(true);
                        }
                }
            }
        }

    },

    async editRewards()
        {
            const reviewReward = {
                consumer_id: this.consumer_id, // Replace with the actual consumer_id
                item_id: 0, // Replace with the item id
                reward_name: "$10 OFF KOI",
                date: new Date().toISOString(), // Get the current date and time in ISO format
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewReward),
            };
            try {
                const response = await fetch(`https://stingray-app-4wa63.ondigitalocean.app/Reward/api/create/reward`, requestOptions);
                if (response.ok) {
                console.log('Successful Redeemed');
                alert('Successful Redeemed');
                this.getRewardOwn();
                this.checkRewardStatus(); // updated button
                } else {
                console.error('Failed to submit the review:', response.statusText);
                }
            } 
            catch (error) {
            console.error('An error occurred while submitting the review:', error);
            }
        },

        extractId() {
            const button = document.getElementsByTagName("h3");
            this.updatedName = button.id;
        }
    }
  };

</script>

<style>

.rewards.row {
    border: 1px solid;
    border-radius: 10px;
}
</style>

