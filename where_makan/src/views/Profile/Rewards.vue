<template>
    <div>
        <div class="container custom-container">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-wrap justify-content-center">
                        <div class="card reward-card mx-2 my-2" v-for="(item, index) in rewardExchange" :key="index">
                            <div class="card-body">
                                <h5 v-bind="updatedName" class="card-title">{{ item.name }}</h5>
                                <p class="card-text">Terms and conditions apply.</p>
                                <p class="card-text text-warning">{{ item.cost }} Points required to redeem</p>
                                <button type="button" @click="editRewards(); extractId() " :disabled="isButtonDisabled[index]" class="btn btn-outline-primary btn-block text-center span">
                                    {{ rewardStatus[index] }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['consumerId'],
    data() {
      return {
        consumerID: -1,
        points: [{"consumeer_id": 10,"date_last_spend": "2023-11-06T09:59:58.9024169+00:00","total_points": 298,"expiry": "2023-12-06T09:59:58.9024174+00:00"}],
        rewards: [],
        rewardOwn: [],
        rewardExchange: [{ "name": "$5 OFF KOI TEA", "quantity": 3,"cost": 50}, { "name": "$5 NTUC VOUCHER", "quantity": 3,"cost": 50}, { "name": "$25 OFF HAIDILAO", "quantity": 3,"cost": 300},],
        // points: [],
        // rewardOwn: [], //consumer_id, item_id, date
        // rewardExchange: [],
        // claimed, can claim, not enough points to claim
        rewardStatus: [],
        isButtonDisabled: [],
        updatedName: null,
      };
    },
    async created() {
      // Fetch center details based on the centerId prop
      //this.getPoints();
      //this.getRewardOwn();
      //this.getRewardExchange();
      this.consumerID = this.consumerId;
      await this.fetchInitialData();
    },
    methods: {
        
        async fetchInitialData() {
            // Fetch points and rewards data after consumer_id is available
            await Promise.all([
                //this.getPoints(),
                //this.getRewardOwn(),
                //this.getRewardExchange(),
                this.checkRewardStatus(),
            ]);
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
            console.log(this.consumerID)
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
            console.log(this.rewardExchange);
        },

        checkRewardStatus(){
            //check if rewards is owned
            for (let i = 0; i<this.rewardExchange.length; i++){
                var rewardItem = this.rewardExchange[i];
                if (this.rewardOwn.length <= 0){
                    this.rewardStatus.push("Redeem");
                }
                else {
                    for (let x = 0; x<this.rewardOwn.length; x++){
                        var myReward = this.rewardOwn[x];
                        if (myReward == rewardItem.name){
                            this.rewardStatus.push("Redeemed");
                            this.isButtonDisabled.push(true);
                        }
                        else if (this.points[0].total_points >= rewardItem.cost){
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
                console.error('Failed to submit the rewards:', response.statusText);
                }
            } 
            catch (error) {
            console.error('An error occurred while submitting the rewards:', error);
            }
        },

        extractId() {
            const button = document.getElementsByTagName("h5");
            this.updatedName = button.id;
            this.rewardOwn.push(this.rewardExchange[updatedName].name);

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

