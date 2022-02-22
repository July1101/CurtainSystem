<template>
    <section class="chart-container">
      <template>
        <el-row>
          <el-form :inline="true" >
            <el-form-item label="时间段" label-width="100px" >
              <el-select v-model="mode" clearable placeholder="类型" @change="load">
                <el-option
                    v-for="item in sel"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div id="chartColumn" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="6">
            <div id="chartPie" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="6">
            <div id="chartPie1" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="24">
            <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
          </el-col>
        </el-row>
      </template>

    </section>
</template>

<script>
    import echarts from 'echarts'
    import {getYearData,get10DaysData,getPartInput,getPartOutput} from '../../api/api';
    export default {
        data() {
            return {
                chartColumn: null,
                chartPie: null,
              chartPie1: null,
              input:[],
              output:[],
              date:[],


              part1:[],
              part2:[],


              all_year:{
                input:[],
                output:[],
                month:[],
              },

              every10Days:{
                input:[],
                output:[],
                month:[],
              },


              mode:'过去十二个月',
              sel:[
                  "过去十二个月",
                  "过去六个月",
                  "过去四个月",
              ],

              in:{
                last_year:{},
                last_six_month:{},
                last_four_month:{},
              },
              out:{
                last_year:{},
                last_six_month:{},
                last_four_month:{},
              },
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: this.mode },
                  tooltip: {},
                  xAxis: {
                      data: this.date
                  },
                  yAxis: {},
                  series: [{
                      name: '收入',
                      type: 'bar',
                      data: this.input
                    },
                    {
                      name: '支出',
                      type: 'bar',
                      data: this.input,
                      itemStyle:{
                        borderColor: '#73c0de',
                      }
                    }
                  ]
                });
            },
            drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '收入类型',
                        subtext: this.mode,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.part1,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
          drawPieChart2() {
            this.chartPie1 = echarts.init(document.getElementById('chartPie1'));
            this.chartPie1.setOption({
              title: {
                text: '支出类型',
                subtext: this.mode,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: this.part2,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            });
          },
            drawCharts() {
                this.drawColumnChart()
                this.drawPieChart()
              this.drawPieChart2()
            },

          load(){
              if(this.mode=="过去十二个月"){
                this.input=this.all_year.input
                this.output=this.all_year.output
                this.date=this.all_year.month

                this.part1=this.in.last_year
                this.part2=this.out.last_year

              }
              else if(this.mode=="过去六个月"){
                this.input=this.all_year.input.slice(0,6)
                this.output=this.all_year.output.slice(0,6)
                this.date=this.all_year.month.slice(0,6)

                this.part1=this.in.last_six_month
                this.part2=this.out.last_six_month

              }else{
                this.input=this.every10Days.input
                this.output=this.every10Days.output
                this.date=this.every10Days.month

                this.part1=this.in.last_four_month
                this.part2=this.out.last_four_month

              }
            this.drawCharts()
          }
        },
        mounted: function () {
          getYearData().then((res)=>{
            this.all_year=res.data
          })
          get10DaysData().then((res)=>{
            this.every10Days=res.data
          })
          getPartInput().then((res)=>{
            this.in=res.data
          })
          getPartOutput().then((res)=>{
            this.out=res.data
          })

          setTimeout(()=>{this.load()},300)
        },
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
