<template>
  <div class="content">
      <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    <div class="top-row">
        <!-- CSS with hypens - use camel case: <div class="top part" :style="{backgroundColor: 'yellow'}"> -->
        <!-- Multiple computed styles (later ones override settings in first if there is a conflict) <div class="top part" :style="[headBorderStyle, moreStyles]"> -->
        <!-- <div class="top part" :style="headBorderStyle"> -->
        <!-- <div class="top part" :class="{'sale-border': selectedRobot.head.onSale}"> -->
        <!-- <div class="top part" :class="[saleBorderClass]"> -->
            <div :class="[saleBorderClass, 'top', 'part']">
          <div class="robot-name"> 
            {{selectedRobot.head.title}}
            <span v-show="selectedRobot.head.onSale" class="sale">Sale!</span>
          </div>
        <img :src="selectedRobot.head.src" title="head"/>
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftarm.src" title="left arm"/>
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9668;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9658;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="torso"/>
        <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightarm.src" title="right arm"/>
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9668;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" title="base"/>
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div>
    </div>
  <div>
      <h1>Cart</h1>
      <table>
          <thead>
              <tr>
                  <th>Robot</th>
                  <th class="cost">Cost</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(robot,index) in cart" :key="index">
                  <td>
                      {{robot.head.title}}
                  </td>
                  <td class="cost">
                      {{robot.cost}}
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  </div>
</template>

<script lang="ts">
    import availableParts from '../data/parts';
    import createdHookMixin from './created-hook-mixin';
    function getPreviousValidIndex(index : number, length : number) {
        const deprecatedIndex = index - 1;
        return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
    }

    function getNextValidIndex(index: number, length : number) {
        const incrementedIndex = index + 1;
        return incrementedIndex > length - 1 ? 0 : incrementedIndex;
    }

    export default {
        name: 'RobotBuilder',
        data() {
            return {
                availableParts,
                cart : <any[]>[] ,
                selectedHeadIndex : 0,
                selectedLeftArmIndex : 0,
                selectedTorsoIndex : 0,
                selectedRightArmIndex : 0,
                selectedBaseIndex : 0,
            };
        },
        mixins: [
            createdHookMixin,
        ],
        computed: {
            saleBorderClass() {
                let head = this.selectedRobot.head;
                return  head.onSale ?  
                        'sale-border' : 
                        '';
                    
            },

            headBorderStyle(){
                let head = this.selectedRobot.head;
                return  { 
                    border: head.onSale ?  
                        '3px solid red' : 
                        '3px solid grey',
                    };
            },
            selectedRobot(){
                
                let head : number= this.selectedHeadIndex;
                let leftarm : number= this.selectedLeftArmIndex;
                let torso : number= this.selectedTorsoIndex;
                let rightarm : number= this.selectedRightArmIndex;
                let base : number= this.selectedBaseIndex;

                return {
                    head: availableParts.heads[head],
                    leftarm: availableParts.arms[leftarm],
                    torso: availableParts.torsos[torso],
                    rightarm: availableParts.arms[rightarm],
                    base: availableParts.bases[base],
                };
            }
        },
        methods: {  
            addToCart() {
                const robot = this.selectedRobot;
                const cost = robot.head.cost + robot.leftarm.cost + robot.torso.cost + robot.rightarm.cost + robot.base.cost;
                //this.cart.push(Object.assign({}, robot, {cost}));
                let robotCopy = {...robot, cost};
                this.cart.push(
                    robotCopy);
            },
            selectNextHead() {
                this.selectedHeadIndex = 
                    getNextValidIndex(this.selectedHeadIndex, availableParts.heads.length);
            },
            selectPreviousHead(){
                this.selectedHeadIndex = 
                    getPreviousValidIndex(this.selectedHeadIndex, availableParts.heads.length);
            },
            selectNextLeftArm() {
                this.selectedLeftArmIndex = 
                    getNextValidIndex(this.selectedLeftArmIndex, availableParts.arms.length);
            },
            selectPreviousLeftArm(){
                this.selectedLeftArmIndex = 
                    getPreviousValidIndex(this.selectedLeftArmIndex, availableParts.arms.length);
            },
            selectNextTorso() {
                this.selectedTorsoIndex = 
                    getNextValidIndex(this.selectedTorsoIndex, availableParts.torsos.length);
            },
            selectPreviousTorso(){
                this.selectedTorsoIndex = 
                    getPreviousValidIndex(this.selectedTorsoIndex, availableParts.torsos.length);
            },
            selectNextRightArm() {
                this.selectedRightArmIndex = 
                    getNextValidIndex(this.selectedRightArmIndex, availableParts.arms.length);
            },
            selectPreviousRightArm(){
                this.selectedRightArmIndex = 
                    getPreviousValidIndex(this.selectedRightArmIndex, availableParts.arms.length);
            },
            selectNextBase() {
                this.selectedBaseIndex = 
                    getNextValidIndex(this.selectedBaseIndex, availableParts.bases.length);
            },
            selectPreviousBase(){
                var p = this.selectedBaseIndex;
                this.selectedBaseIndex = 
                    getPreviousValidIndex(p, availableParts.bases.length);
            }


}
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
} 
.part {
    img {
  width:165px;
    }
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;    
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;  
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;    
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name{
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
}
.sale{
    color: red;
}
.content {
    position: relative;
}

.add-to-cart {
    position: absolute;
    right: 30px;
    width: 220px;
    padding: 3px;
    font-size: 16px;
}

td, th {
    text-align: left;
    padding: 5px;
    padding-right: 20px;
}

.cost{
    text-align: right;
}

.sale-border {
    border: 3px solid red;
}
</style>
