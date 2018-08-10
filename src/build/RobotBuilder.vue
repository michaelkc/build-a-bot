<template>
  <div class="content">
    <div class="preview">
        <!-- <CollapsibleSection>
        </CollapsibleSection> -->
        <CollapsibleSection>
        <div class="preview-content">
            <div class="top-row">
                <img :src="selectedRobot.head.src"/>
            </div>
            <div class="middle-row">
                <img :src="selectedRobot.leftarm.src" class="rotate-left"/>
                <img :src="selectedRobot.torso.src"/>
                <img :src="selectedRobot.rightarm.src" class="rotate-right"/>
            </div>
            <div class="bottom-row">
                <img :src="selectedRobot.base.src"/>
            </div>
        </div>
        </CollapsibleSection>
        <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    </div>
    <div class="top-row">
        <!-- CSS with hypens - use camel case: <div class="top part" :style="{backgroundColor: 'yellow'}"> -->
        <!-- Multiple computed styles (later ones override settings in first if there is a conflict) <div class="top part" :style="[headBorderStyle, moreStyles]"> -->
        <!-- <div class="top part" :style="headBorderStyle"> -->
        <!-- <div class="top part" :class="{'sale-border': selectedRobot.head.onSale}"> -->
        <!-- <div class="top part" :class="[saleBorderClass]"> -->
        <!-- <div class="robot-name"> 
        {{selectedRobot.head.title}}
        <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div> -->
        <PartSelector position="top" :parts="availableParts.heads" @part-selected="part => selectedRobot.head = part" />      
    </div>
    <div class="middle-row">
        <PartSelector position="left" :parts="availableParts.arms" @part-selected="part => selectedRobot.leftarm = part" />
        <PartSelector position="center" :parts="availableParts.torsos" @part-selected="part => selectedRobot.torso = part" />
        <PartSelector position="right" :parts="availableParts.arms" @part-selected="part => selectedRobot.rightarm = part" />
    </div>
    <div class="bottom-row">
        <PartSelector position="bottom" :parts="availableParts.bases" @part-selected="part => selectedRobot.base = part" />
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
    import Vue from 'vue';
    import {Robot} from '../data/Interfaces';
    import {Part} from '../data/Interfaces';
    import availableParts from '../data/parts';
    import createdHookMixin from './created-hook-mixin';
    import PartSelector from './PartSelector.vue';
    import CollapsibleSection from '../shared/CollapsibleSection.vue'
    export default Vue.extend({
        name: 'RobotBuilder',
        components: {PartSelector, CollapsibleSection},
        data() {
            return {
                availableParts,
                cart: [] as Robot[],
                selectedRobot: {
                    head: {} as Part,
                    leftarm: {} as Part,
                    torso: {} as Part,
                    rightarm: {} as Part,
                    base: {} as Part
                } as Robot,
            };
        },
        mixins: [
            createdHookMixin,
        ],
        computed: {
            saleBorderClass() :  string  {
                const head = this.selectedRobot.head;
                return head.onSale ? 'sale-border' : '';
            },

            headBorderStyle(): any {
                const head = this.selectedRobot.head;
                return { border: head.onSale ? '3px solid red' : '3px solid grey'};
            },
        },
        methods: {
            handlePartSelected(source: string, part: Part) {
                console.log(source);
                switch (source) {
                    case "top": 
                        this.selectedRobot.head = part;
                        break;
                
                    case "left": 
                        this.selectedRobot.leftarm = part;
                        break;
                
                    case "center": 
                        this.selectedRobot.torso = part;
                        break;
                
                    case "right": 
                        this.selectedRobot.rightarm = part;
                        break;
                
                    case "bottom": 
                        this.selectedRobot.base = part;
                        break;
                }
            },
            addToCart() {
                const robot = this.selectedRobot;
                const cost =    robot.head.cost +
                                robot.leftarm.cost +
                                robot.torso.cost +
                                robot.rightarm.cost +
                                robot.base.cost;
                // this.cart.push(Object.assign({}, robot, {cost}));
                const robotCopy = {...robot, cost} as Robot;
                this.cart.push(
                    robotCopy);
            },
        },
    });
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
    width: 210px;
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
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}

</style>
