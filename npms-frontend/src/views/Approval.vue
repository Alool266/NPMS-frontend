<template>
  <div class="approval">
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <el-image
            class="icon"
            :src="require('@/assets/image/icon/list.png')"
          />
          <span style="font-size: 20px">Opportunity Approval</span>
        </div>
      </template>
      <div class="content">
        <div class="content-header">
          <el-row style="width: 100%">
            <el-col :span="8" style="float: right; text-align: right">
              <el-button type="primary" @click="getApprovalPage()"
                >Refresh</el-button
              >
            </el-col>
          </el-row>
        </div>

        <div class="content-main">
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%; margin: 1em 0; margin-top: 20px"
            v-loading="loading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column
              prop="flowName"
              label="process name"
              align="center"
              width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppId"
              label="opportunity number"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppName"
              label="opportunity name"
              align="center"
              width="300"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppPhase"
              label="opportunity stage"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppSubmiter"
              label="Submitter"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="submitDate"
              label="submission date"
              align="center"
              width="220"
              show-overflow-tooltip
            />

            <el-table-column label="operate" align="center" width="200">
              <template #default="scope">
                <el-button
                  size="small"
                  round
                  @click="
                    getApproveDetail(scope.$index);
                    ApproveDetailForm = true;
                    oppIdB = tableData[scope.$index].oppIdB;
                    changeActive(scope.$index);
                  "
                  >Enter the approval page</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :total="total"
          />
        </div>
      </div>
    </el-card>
  </div>

  <!-- 机会审批详情 -->
  <el-dialog v-model="ApproveDetailForm" :with-header="false" width="60%">
    <el-header style="font-size: 18px"
      >Opportunity Stage Description
      <el-col :span="4" style="float: right; text-align: right">
        <el-button
          fixed="right"
          size="medium"
          type="primary"
          round
          @click="
            flowChartForm = true;
            getApproveStatus();
          "
          >flow chart</el-button
        >
      </el-col>
    </el-header>
    <el-dialog v-model="flowChartForm">
      <el-steps
        :space="200"
        :active="approvePhaseId"
        finish-status="success"
        align-center
      >
        <el-step title="submit"></el-step>
        <el-step title="Manager"></el-step>
        <el-step title="director approval"></el-step>
      </el-steps>
    </el-dialog>

    <el-steps :active="oppPhaseId" align-center>
      <el-step title="E" description="Only intention, model selection has not yet started"></el-step>
      <el-step title="D" description="Exchange show"></el-step>
      <el-step title="C" description="The exchange exhibition is over, waiting for bidding"></el-step>
      <el-step title="B" description="bidding"></el-step>
      <el-step title="A" description="Bidding, business, contract"></el-step>
      <el-step title="S" description="contract signed"></el-step>
    </el-steps>

    <el-descriptions
      title="Opportunity basic information"
      :column="2"
      border
      style="margin: 1em"
    >
      <el-descriptions-item
        label="opportunity number"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppId }}</el-descriptions-item
      >
      <el-descriptions-item
        label="opportunity name"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbName }}</el-descriptions-item
      >
      <el-descriptions-item
        label="sales department"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbSalesDept }}</el-descriptions-item
      >
      <el-descriptions-item
        label="account Manager"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbCustomerManagerId }}</el-descriptions-item
      >
      <el-descriptions-item
        label="client's name"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbCusId }}</el-descriptions-item
      >

      <el-descriptions-item
        label="opportunity attribution"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbBelonging }}</el-descriptions-item
      >
      <el-descriptions-item
        label="source of opportunity"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbOrigin }}</el-descriptions-item
      >
      <el-descriptions-item
        label="Pre-sign time"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbSignTime }}</el-descriptions-item
      >
      <el-descriptions-item
        label="opportunity stage"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppPhase }}</el-descriptions-item
      >
      <el-descriptions-item
        label="Tobacco/Electricity Old Customers"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbCigarettes }}</el-descriptions-item
      >
      <el-descriptions-item
        label="Opportunity Background Note"
        label-align="right"
        align="center"
        >{{ ApproveDetail.oppbBackground }}</el-descriptions-item
      >
    </el-descriptions>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">type list</div>
      <br />
      <el-table
        :data="subOpportunityBufferList"
        style="width: 100%"
        border
        max-height="163"
      >
        <el-table-column
          prop="subOppbId"
          label="sub-opportunity number"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppbName"
          label="Sub-opportunity name"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppbType"
          label="opportunity type"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppbProduct"
          label="product"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppbDept"
          label="Division"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppbCurrency"
          label="currency"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppbMoney"
          label="the amount"
          align="center"
        ></el-table-column>
      </el-table>
    </dir>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">competitive situation</div>
      <br />
      <el-table
        :data="competitorBufferList"
        style="width: 100%"
        border
        max-height="163"
      >
        <el-table-column
          prop="compbName"
          label="competitor name"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="compbPosition"
          label="competitive potential"
          align="center"
        ></el-table-column>
      </el-table>
    </dir>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">Purchase Decision Maker Information</div>
      <br />
      <el-table
        :data="payerBufferList"
        style="width: 100%"
        border
        max-height="163"
      >
        <el-table-column
          prop="pbName"
          label="Name"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="pbDept"
          label="department"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pbPosition"
          label="Position"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="pbPhone"
          label="contact number"
          align="center"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="pbDecision"
          label="decision maker"
          align="center"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="pbEffect"
          label="influence level"
          align="center"
          width="115"
        ></el-table-column>
        <el-table-column
          prop="pbAgree"
          label="Degree of recognition"
          align="center"
          width="115"
        ></el-table-column>
      </el-table>
    </dir>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">Opportunity Track Record</div>
      <br />
      <el-table
        :data="trackinglogList"
        style="width: 100%"
        border
        max-height="163"
      >
        <el-table-column
          prop="tType"
          label="Service category"
          width="80"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="tDate"
          label="interview date"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="tOurParty" label="Our personnel" align="center">
        </el-table-column>

        <el-table-column prop="tCusParty" label="Customer personnel" align="center">
        </el-table-column>

        <el-table-column prop="tThirdParty" label="third party personnel" align="center">
        </el-table-column>

        <el-table-column
          prop="tContactWay"
          label="communication method"
          width="100"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="tPlace" label="Place" width="115" align="center">
        </el-table-column>
        <el-table-column
          prop="tContactCondition"
          label="communication"
          width="80"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="tContactEffect"
          label="communication effect"
          width="80"
          align="center"
        >
        </el-table-column>
      </el-table>
    </dir>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">Opportunity Approval Log</div>
      <br />
      <el-table
        :data="approvallogList"
        style="width: 100%"
        border
        max-height="163"
      >
        <el-table-column prop="flowName" label="process name" align="center">
        </el-table-column>

        <el-table-column prop="approver" label="Approver" align="center">
        </el-table-column>

        <el-table-column
          prop="approveStatus"
          label="Approval Status"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="approveOpinion"
          label="Approval comments"
          width="120"
          align="center"
        >
        </el-table-column>

        <el-table-column prop="approveTime" label="application time" align="center">
        </el-table-column>
      </el-table>
    </dir>
    <br />
    <el-select v-model="approveResult" placeholder="Approval results">
      <el-option label="agree" value="1"></el-option>
      <el-option label="reject" value="-1"></el-option>
      <el-option label="return" value="0"></el-option>
    </el-select>
    <el-input
      v-model="approveAdvice"
      placeholder="Please fill in the approval comments"
      style="width: 400px"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ApproveDetailForm = false" fixed="right"
          >Cancel</el-button
        >
        <el-button type="primary" @click="submitApproval()" fixed="right"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>



<script>
import { reactive, toRefs ,onMounted } from "vue";
import { ElNotification } from "element-plus";
export default {
  setup() {
    const state = reactive({
      emp_info: {
        empId:'',
        access_token:'',
        empPositionId: '',
      },
    });
    onMounted(() => {
        init()
    })
    const init = () => {
        state.emp_info.empId = window.sessionStorage.getItem('username');
        state.emp_info.access_token = window.sessionStorage.getItem('token');
        state.emp_info.empPositionId = window.sessionStorage.getItem('position').substring(5);
        console.log(state.emp_info);
    }

    return {
      ...toRefs(state),
      init
    };
  },

  data() {
    return {
      tableData: [],
      ApproveDetailForm: false,
      flowChartForm: false,
      oppIdB: "",
      ApproveDetail: [],
      subOpportunityBufferList: [],
      competitorBufferList: [],
      payerBufferList: [],
      trackinglogList: [],
      approvallogList: [],
      customer: [],

      approvePhaseId: 0,

      oppPhase: "",
      oppPhaseId: "",

      approveResult: "",
      approveAdvice: "",

      loading: true,
    };
  },

  methods: {
    getApproveStatus() {
      this.axios
        .get(
          "http://localhost:14000/oppManagement/oppManagement/opportunity/showOppApproveDetail",
          {
            params: { oppIdB: this.oppIdB ,access_token:this.emp_info.access_token},
          }
        )
        .then((res) => {
          console.log(res.data);
          this.flowPhaseId =
            parseInt(res.data.obj.opportunityBuffer.oppbApproveStatus) + 1;
          console.log('flowPhaseId'+this.flowPhaseId);
        });
    },

    getApprovalPage() {
      this.axios
        .get(
          "http://localhost:14000/oppManagement/oppManagement/opportunity/getApprovalPage",
          {
            params: { empId: this.emp_info.empId ,access_token:this.emp_info.access_token},
          }
        )
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.obj;

          this.loading = false;
        });
    },

    getApproveDetail(index) {
      var target = this.tableData[index];
      console.log(target);
      this.axios
        .get(
          "http://localhost:14000/oppManagement/oppManagement/opportunity/showOppApproveDetail",
          {
            params: { oppIdB: target.oppIdB ,access_token:this.emp_info.access_token},
          }
        )
        .then((res) => {
          console.log(res.data);
          this.ApproveDetail = res.data.obj.opportunityBuffer;
          this.approvePhaseId =
            parseInt(this.ApproveDetail.oppbApproveStatus) + 1;

          this.subOpportunityBufferList = res.data.obj.subOpportunityBufferList;
          this.competitorBufferList = res.data.obj.competitorBufferList;
          this.payerBufferList = res.data.obj.payerBufferList;
          this.trackinglogList = res.data.obj.trackinglogList;
          this.approvallogList = res.data.obj.approvallogList;

          this.customer = res.data.obj.customer;
        });
    },

    changeActive(index) {
      var target = this.tableData[index];
      this.ApproveDetail.oppPhase = target.oppPhase;
      console.log(this.oppPhase);
      if (this.ApproveDetail.oppPhase == "E") {
        this.oppPhaseId = 1;
      } else if (this.ApproveDetail.oppPhase == "D") {
        this.oppPhaseId = 2;
      } else if (this.ApproveDetail.oppPhase == "C") {
        this.oppPhaseId = 3;
      } else if (this.ApproveDetail.oppPhase == "B") {
        this.oppPhaseId = 4;
      } else if (this.ApproveDetail.oppPhase == "A") {
        this.oppPhaseId = 5;
      } else if (this.ApproveDetail.oppPhase == "S") {
        this.oppPhaseId = 6;
      } else {
        this.oppPhaseId = 0;
      }
      console.log(this.oppPhaseId);
    },

    submitApproval() {
            console.log('all used:')
            console.log(this.oppIdB)
            console.log(this.approveResult)
            console.log(this.approveAdvice)
            console.log(this.emp_info.access_token)
            console.log(this.emp_info.empPositionId)

            this.axios.post(
              "http://localhost:14000/oppManagement/oppManagement/opportunity/approval",
              {
                empName: "kim",
                empPositionId: this.emp_info.empPositionId,
                oppIdB: this.oppIdB,
                approveResult: '' + this.approveResult,
                approveAdvice: this.approveAdvice,
              },{params:{access_token:this.emp_info.access_token}}
            ).then((res) => {
              console.log(res.data);
            });

            this.ApproveDetailForm = false;

            ElNotification({
              title: "system hint",
              message: "Approval successful!",
              duration: 2000,
              type: "success",
            });
    },
  },
};
</script>
<style lang="less">
@import "../common/style/common";
.approval {
  .content-main {
    .table-image {
      width: 45px;
      height: 45px;
    }
  }
}
</style>