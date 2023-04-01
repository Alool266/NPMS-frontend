<template>
  <div class="chances">
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <el-image
            class="icon"
            :src="require('@/assets/image/icon/list.png')"
          />
          <span style="font-size: 20px">opportunity maintenance</span>
        </div>
      </template>
      <div class="content">
        <div class="content-header">
          <el-row style="width: 100%">
            <el-select v-model="search" placeholder="Please select the category to search">
              <el-option label="opportunity number" value="01"></el-option>
              <el-option label="opportunity name" value="02"></el-option>
              <el-option label="source of opportunity" value="03"></el-option>
              <el-option label="Opportunity Stage" value="04"></el-option>
              <el-option label="sales department" value="05"></el-option>
              <el-option label="account Manager" value="06"></el-option>
            </el-select>

            <el-col :span="4">
              <el-input
                v-model="keyword"
                placeholder="Please enter a keyword to search"
              ></el-input>
            </el-col>

            <el-col :span="4" style="margin-left: 20px">
              <el-button type="primary" @click="init">Inquire</el-button>
            </el-col>

            <el-col :span="4" style="float: right; text-align: right">
              <el-button
                type="primary"
                @click="
                  addChance = {};
                  chanceData = [];
                  newSonChance = {};
                  competeData = [];
                  newCompetitor = {};
                  payerData = [];
                  newDecider = {};
                  addOrUpdateState = 0;
                  addOrUpdate();
                  addChanceForm = true;
                "
                >Add</el-button
              >
            </el-col>
            <el-col :span="4" style="float: right; text-align: right">
              <el-button type="primary" @click="getMainPage()">Refresh</el-button>
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
            element-loading-background="rgba(0, 0, 0, 0.8)">
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
              width="200"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppOrigin"
              label="source of opportunity"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppPhase"
              label="opportunity stage"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppSignTime"
              label="Pre-sign time"
              align="center"
              width="180"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppSalesDeptName"
              label="sales department"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="oppCustomerManagerName"
              label="account Manager"
              align="center"
              show-overflow-tooltip
            />

            <el-table-column label="operate" align="center" width="300">
              <template #default="scope">
                <el-button
                  size="small"
                  round
                  @click="
                    getChanceDetail(scope.$index);
                    changeActive(scope.$index);
                    detailDataForm = true;
                  "
                  >details</el-button
                >
                <el-button
                  size="small"
                  round
                  @click="
                    addOrUpdateState = 1;
                    addOrUpdate();
                    addChanceForm = true;
                    getChanceEdit(scope.$index);
                  "
                  >edit</el-button
                >
                <el-button
                  size="small"
                  round
                  @click="
                    trackChanceForm = true;
                    getChanceTrack(scope.$index);
                  "
                  >opportunity tracking</el-button
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

  <!--新增机会 -->
  <el-dialog
    :title="addOrUpdateList.ChanceTitle"
    v-model="addChanceForm"
    width="60%"
  >
    <el-container>
      <el-header style="text-align: left; font-size: 16px">
        <offset>Opportunity Stage Description</offset>
      </el-header>
      <el-main>
        <el-steps :active="oppPhaseId" align-center>
          <el-step title="E" description="Only intention, model selection has not yet started"></el-step>
          <el-step title="D" description="Exchange show"></el-step>
          <el-step title="C" description="The exchange exhibition is over, waiting for bidding"></el-step>
          <el-step title="B" description="bidding"></el-step>
          <el-step title="A" description="Bidding, business, contract"></el-step>
          <el-step title="S" description="contract signed"></el-step>
        </el-steps>
      </el-main>
    </el-container>

    <br />

    <el-container>
      <!--机会基本信息-->
      <el-header style="text-align: left; font-size: 16px">
        <offset>Opportunity basic information</offset>
      </el-header>
      <el-main>
        <el-form :model="addChance">
          <el-row>
            <el-form-item label="opportunity name" :label-width="formLabelWidth">
              <el-input
                v-model="addChance.oppbName"
               
              ></el-input>
               <!-- @blur="testAddRepetition()" -->
            </el-form-item>

            <el-form-item label="client's name" :label-width="formLabelWidth">
              <el-input v-model="addChance.oppbCusId"></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item
              label="source of opportunity"
              :label-width="formLabelWidth"
              style="width: 402px"
            >
              <el-select
                v-model="addChance.oppbOrigin"
                placeholder="Please select an opportunity sourcep"
              >
                <el-option label="company" value="company"></el-option>
                <el-option label="person" value="person"></el-option>
                <el-option label="factory" value="factory"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="opportunity stage"
              :label-width="formLabelWidth"
              style="width: 402px"
            >
              <el-select
                v-model="addChance.oppbPhase"
                placeholder="Please select opportunity stage"
              >
                <el-option label="E" value="E"></el-option>
                <el-option label="D" value="D"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="A" value="A"></el-option>
                <el-option label="S" value="S"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="" :label-width="formLabelWidth">
              <!-- `checked` 为 true 或 false -->
              <el-checkbox v-model="addChance.oppbCigarettes"
                >Electricity Old Customers</el-checkbox
              >
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item
              label="Pre-sign time"
              :label-width="formLabelWidth"
              style="width: 402px"
            >
              <el-date-picker
                v-model="addChance.oppbSignTime"
                type="date"
                placeholder="select date"
              ></el-date-picker>
            </el-form-item>

            <el-form-item
              label="opportunity attribution"
              :label-width="formLabelWidth"
              style="width: 402px"
            >
              <el-select
                v-model="addChance.oppbBelonging"
                placeholder="Please select opportunity attribution"
              >
                <el-option label="Product Division 1" value="shenyang"></el-option>
                <el-option label="Product Division 2" value="beijing"></el-option>
                <el-option label="Product Division 3" value="beijing"></el-option>
                <el-option label="Product Division 4" value="beijing"></el-option>
                <el-option label="Product Division 5" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <el-form-item
            label="Opportunity Background Note"
            :label-width="formLabelWidth"
            style="width: 805px"
          >
            <el-input
              v-model="addChance.oppbBackground"
              type="textarea"
              rows="3"
            ></el-input>
          </el-form-item>
        </el-form>

        <br />

        <!--sub-opportunity list-->
        <el-header style="text-align: left; font-size: 16px">
          <offset>sub-opportunity list</offset>
          <el-col :span="4" style="float: right; text-align: right">
            <el-button type="primary" @click="addSonChanceForm = true"
              >Add</el-button>
          </el-col>
        </el-header>
        <el-table :data="chanceData" style="width: 100%">
          <el-table-column
            prop="subOppbName"
            label="Sub-opportunity name"
            width="170"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="subOppbType"
            label="opportunity type"
            width="140"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="subOppbProduct"
            label="product"
            width="140"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="subOppbDept"
            label="Division"
            width="150"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="subOppbCurrency"
            label="currency"
            width="80"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="subOppbMoney"
            label="the amount"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="operate"
            width="100"
            align="center"
          >
            <template #default="scope">
              <el-button
                @click.prevent="deleteRow(scope.$index, chanceData)"
                type="text"
                size="small"
                >remove</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <br />
        <br />
        <el-header style="text-align: left; font-size: 16px">
          <offset>competitive situation</offset>
          <el-col :span="4" style="float: right; text-align: right">
            <el-button type="primary" @click="addCompetitorForm = true"
              >Add</el-button
            >
          </el-col>
        </el-header>

        <!--新增子机会对话框-->
        <el-dialog
          :title="addOrUpdateList.SonChanceTitle"
          v-model="addSonChanceForm"
          width="30%"
        >
          <el-form v-model="newSonChance">
            <el-row justify="center">
              <el-form-item label="Sub-opportunity name">
                <el-input
                  v-model="newSonChance.subOppbName"
                  placeholder="enter a name"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item label="opportunity type">
                <el-select
                  v-model="newSonChance.subOppbType"
                  style="width: 215px"
                >
                  <el-option label="Implementation of third-party software products" value="01"></el-option>
                  <el-option label="Custom Development" value="02"></el-option>
                  <el-option label="third party service" value="05"></el-option>
                  <el-option label="Third Party Software Products" value="06"></el-option>
                  <el-option
                    label="Third-party software product maintenance fee"
                    value="07"
                  ></el-option>
                  <el-option label="own software product" value="08"></el-option>
                  <el-option label="Own software product maintenance fee" value="09"></el-option>
                  <el-option label="hardware product" value="12"></el-option>
                  <el-option label="non-product development" value="14"></el-option>
                  <el-option label="Product development" value="15"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item label="product">
                <el-select
                  v-model="newSonChance.subOppbProduct"
                  style="width: 245px"
                >
                  <el-option label="SAP" value="01"></el-option>
                  <el-option label="ORACLE" value="02"></el-option>
                  <el-option label="NSRM" value="03"></el-option>
                  <el-option label="NPMS" value="04"></el-option>
                  <el-option label="NFOL" value="05"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item label="currency">
                <el-select
                  v-model="newSonChance.subOppbDept"
                  style="width: 230px"
                >
                  <el-option label="Industry Division I" value="01"></el-option>
                  <el-option label="Industry Division II" value="02"></el-option>
                  <el-option label="Industry business department three" value="03"></el-option>
                  <el-option label="Industry business department four" value="04"></el-option>
                  <el-option label="Industry Department Five" value="05"></el-option>
                  <el-option label="Product Division 1" value="06"></el-option>
                  <el-option label="Product Division II" value="07"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item label="currency">
                <el-select
                  v-model="newSonChance.subOppbCurrency"
                  style="width: 245px"
                >
                  <el-option label="Dollar" value="01"></el-option>
                  <el-option label="RMB" value="02"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item label="the amount">
                <el-input
                  v-model="newSonChance.subOppbMoney"
                  placeholder="Enter the amount"
                  style="width: 250px"
                ></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addSonChanceForm = false" fixed="right"
                >Cancel</el-button
              >
              <el-button
                type="primary"
                @click="
                  addSonChanceForm = false;
                  addItem(chanceData, newSonChance);
                "
                fixed="right"
                >confirm</el-button
              >
            </span>
          </template></el-dialog
        >

        <!--竞争情况列表-->
        <el-table :data="competeData" style="width: 100%">
          <el-table-column prop="compbName" label="competitors" align="center">
          </el-table-column>

          <el-table-column prop="compbPosition" label="competitive potential" align="center">
          </el-table-column>

          <el-table-column fixed="right" label="operate" width="90" align="center">
            <template #default="scope">
              <el-button
                @click.prevent="deleteRow(scope.$index, competeData)"
                type="text"
                size="small"
                >remove</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!--新增竞争情况对话框-->
        <el-dialog
          :title="addOrUpdateList.CompetitorTitle"
          v-model="addCompetitorForm"
        >
          <el-form :inline="true" v-model="newCompetitor">
            <el-form-item label="competitors">
              <el-input
                v-model="newCompetitor.compbName"
                placeholder="enter competitor"
              ></el-input>
            </el-form-item>

            <el-form-item label="competitive potential">
              <el-select v-model="newCompetitor.compbPosition">
                <el-option label="only choice" value="10"></el-option>
                <el-option label="leader" value="20"></el-option>
                <el-option label="evenly matched" value="30"></el-option>
                <el-option label="behind" value="40"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addCompetitorForm = false" fixed="right"
                >Cancel</el-button
              >
              <el-button
                type="primary"
                @click="
                  addCompetitorForm = false;
                  addItem(competeData, newCompetitor);
                "
                fixed="right"
                >Confirm</el-button
              >
            </span>
          </template>
        </el-dialog>

        <br />
        <br />
        <!--购买决策人信息-->
        <el-header style="text-align: left; font-size: 16px">
          <offset>Purchase Decision Maker Information</offset>
          <el-col :span="4" style="float: right; text-align: right">
            <el-button type="primary" @click="addDeciderForm = true"
              >Add</el-button
            >
          </el-col>
        </el-header>
        <el-table :data="payerData" style="width: 100%">
          <el-table-column
            prop="pbName"
            label="Name"
            width="110"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="pbDept"
            label="department"
            width="170"
            align="center"
          >
          </el-table-column>

          <el-table-column prop="pbPosition" label="Position" align="center">
          </el-table-column>

          <el-table-column
            prop="pbPhone"
            label="contact number"
            width="120"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="pbDecision"
            label="purchase decision maker"
            width="130"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="pbEffect"
            label="influence level"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="pbAgree"
            label="Degree of recognition"
            width="80"
            align="center"
          >
          </el-table-column>

          <el-table-column fixed="right" label="operate" width="90" align="center">
            <template #default="scope">
              <el-button
                @click.prevent="deleteRow(scope.$index, payerData)"
                type="text"
                size="small"
                >remove</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          :title="addOrUpdateList.DeciderTitle"
          v-model="addDeciderForm"
          width="30%"
        >
          <el-form :inline="true" v-model="newDecider">
            <el-row justify="center">
              <el-form-item label="Name">
                <el-input
                  v-model="newDecider.pbName"
                  placeholder="Enter the name of the decision maker"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row justify="center">
              <el-form-item label="department">
                <el-input
                  v-model="newDecider.pbDept"
                  placeholder="Enter decision maker department"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row justify="center">
              <el-form-item label="Position">
                <el-input
                  v-model="newDecider.pbPosition"
                  placeholder="Enter decision maker position"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row justify="center">
              <el-form-item label="Contact number">
                <el-input
                  v-model="newDecider.pbPhone"
                  placeholder="Enter the contact number of the decision maker"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row justify="center">
              <el-form-item label="decision maker">
                <el-select v-model="newDecider.pbDecision">
                  <el-option label="final decision maker" value="10"></el-option>
                  <el-option label="decision maker" value="20"></el-option>
                  <el-option label="Technical director" value="30"></el-option>
                  <el-option label="user" value="40"></el-option>
                </el-select>
              </el-form-item>
            </el-row>

            <el-row justify="center">
              <el-form-item label="influence level">
                <el-select v-model="newDecider.pbEffect">
                  <el-option label="high" value="10"></el-option>
                  <el-option label="middle" value="20"></el-option>
                  <el-option label="Low" value="30"></el-option>
                </el-select>
              </el-form-item>
            </el-row>

            <el-row justify="center">
              <el-form-item label="Degree of recognition">
                <el-select v-model="newDecider.pbAgree">
                  <el-option label="fully support" value="10"></el-option>
                  <el-option label="support" value="20"></el-option>
                  <el-option label="neutral" value="30"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>

          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addDeciderForm = false" fixed="right"
                >Cancel</el-button
              >
              <el-button
                type="primary"
                @click="
                  addDeciderForm = false;
                  addItem(payerData, newDecider);
                "
                fixed="right"
                >confirm</el-button
              >
            </span>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addChanceForm = false" fixed="right"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          @click="
            addChanceForm = false;
            addType = 0;
            Finish1();
          "
          fixed="right"
          >save</el-button
        >
        <el-button
          type="danger"
          @click="
            addChanceForm = false;
            addType = 1;
            Finish1();
          "
          fixed="right"
          >confirm</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-drawer
    v-model="detailDataForm"
    :with-header="false"
    direction="rtl"
    size="60%"
    style="overflow-y: scroll"
  >
    <el-header></el-header>
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
        label="opportunity name"
        label-align="right"
        align="center"
        >{{ detailData.oppName }}</el-descriptions-item
      >
      <el-descriptions-item
        label="client's name"
        label-align="right"
        align="center"
        >{{ detailData.oppCusId }}</el-descriptions-item
      >
      <el-descriptions-item
        label="opportunity number"
        label-align="right"
        align="center"
        >{{ detailData.oppId }}</el-descriptions-item
      >
      <el-descriptions-item
        label="opportunity stage"
        label-align="right"
        align="center"
        >{{ detailData.oppPhase }}</el-descriptions-item
      >
      <el-descriptions-item
        label="opportunity attribution"
        label-align="right"
        align="center"
        >{{ detailData.oppBelonging }}</el-descriptions-item
      >
      <el-descriptions-item
        label="Pre-sign time"
        label-align="right"
        align="center"
        >{{ detailData.oppSignTime }}</el-descriptions-item
      >
      <el-descriptions-item
        label="Opportunity Background Note"
        label-align="right"
        align="center"
        >{{ detailData.oppBackground }}</el-descriptions-item
      >
    </el-descriptions>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">type list</div>
      <br />
      <el-table :data="categoryData" style="width: 100%" border>
        <el-table-column
          prop="subOppId"
          label="sub-opportunity number"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppName"
          label="Sub-opportunity name"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppType"
          label="opportunity type"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppProduct"
          label="product"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppDept"
          label="Division"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppCurrency"
          label="currency"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="subOppMoney"
          label="the amount"
          align="center"
        ></el-table-column>
      </el-table>
    </dir>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">competitive situation</div>
      <br />
      <el-table :data="compData" style="width: 100%" border max-height="163">
        <el-table-column
          prop="compName"
          label="competitor name"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="compPosition"
          label="competitive potential"
          align="center"
        ></el-table-column>
      </el-table>
    </dir>

    <dir style="padding: 1em">
      <div class="el-descriptions__title">Purchase Decision Maker Information</div>
      <br />
      <el-table :data="decideData" style="width: 100%" border max-height="163">
        <el-table-column
          prop="pName"
          label="name"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pDept"
          label="department"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pPosition"
          label="Position"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pPhone"
          label="contact number"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="pDecision"
          label="decision maker"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="pEffect"
          label="influence level"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="pAgree"
          label="Degree of recognition"
          align="center"
          width="120"
        ></el-table-column>
      </el-table>
    </dir>
  </el-drawer>

  <!-- 机会跟踪 -->
  <el-dialog title="opportunity tracking" v-model="trackChanceForm" width="60%">
    <el-header style="text-align: left; font-size: 16px">
      <offset>Opportunity Track Record</offset>
      <el-col :span="4" style="float: right; text-align: right"> </el-col>
    </el-header>
    <el-main>
      <el-form :inline="true" v-model="trackData">
        <el-form-item label="opportunity number">
          <span>
            {{ chanceNumber }}
          </span>
        </el-form-item>
        <el-form-item label="opportunity name">
          <span>
            {{ chanceName }}
          </span>
        </el-form-item>
      </el-form>
    </el-main>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="trackChanceForm = false" fixed="right"
          >Cancel</el-button
        >
        <el-button
          type="danger"
          @click="
            trackChanceForm = false;
            Finish2();
          "
          fixed="right"
          >confirm</el-button
        >
      </span>
    </template>

    <el-header style="text-align: left; font-size: 16px">
      <offset>Opportunity Tracking Details</offset>
      <el-col :span="4" style="float: right; text-align: right">
        <el-button
          type="primary"
          @click="
            oppTrackList = [];

            addOrUpdateState = 0;
            addOrUpdate();
            addTrackDataForm = true;
          "
          >Add</el-button
        >
      </el-col>
    </el-header>
    <el-table :data="trackData" style="width: 100%">
      <el-table-column prop="tType" label="Service category" width="80" align="center">
      </el-table-column>

      <el-table-column prop="tDate" label="interview date" width="130" align="center">
      </el-table-column>

      <el-table-column
        prop="tOurParty"
        label="Our personnel"
        width="100"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="tCusParty"
        label="Customer personnel"
        width="100"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="tThirdParty"
        label="third party personnel"
        width="110"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="tContactWay"
        label="communication method"
        width="80"
        align="center"
      >
      </el-table-column>

      <el-table-column prop="tPlace" label="地点" width="115" align="center">
      </el-table-column>
      <el-table-column
        prop="tContactCondition"
        label="communication"
        width="60"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="tContactEffect"
        label="communication effect"
        width="60"
        align="center"
      >
      </el-table-column>

      <el-table-column fixed="right" label="operate" width="70">
        <template #default="scope">
          <el-button
            @click.prevent="deleteRow(scope.$index, trackData)"
            type="text"
            size="small"
            >remove</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="addOrUpdateList.TrackDataTitle"
      v-model="addTrackDataForm"
      width="50%"
    >
      <el-main>
        <el-form :model="oppTrackList">
          <el-row>
            <el-form-item label="Service category" style="width: 400px">
              <el-select v-model="oppTrackList.tType">
                <el-option label="Third-party software service" value="01"></el-option>
                <el-option label="Third Party Software Products" value="02"></el-option>
                <el-option label="own software product" value="03"></el-option>
                <el-option label="Own software products and services" value="04"></el-option>
                <el-option label="system integration" value="05"></el-option>
                <el-option label="non-product development" value="06"></el-option>
                <el-option label="Product development" value="07"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="communication method">
              <el-select v-model="oppTrackList.tContactWay">
                <el-option label="face to face" value="face to face"></el-option>
                <el-option label="Telephone" value="Telephone"></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="interview date" style="width: 400px">
              <el-date-picker
                v-model="oppTrackList.tDate"
                type="date"
                placeholder="select date"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="interview location">
              <el-input date
                v-model="oppTrackList.tPlace"
                placeholder="Enter interview location"
                style="width: 215px"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="Our personnel">
              <el-input
                v-model="oppTrackList.tOurParty"
                style="width: 615px"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="Customer personnel">
              <el-input
                v-model="oppTrackList.tCusParty"
                style="width: 600px"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="third party personnel">
              <el-input
                v-model="oppTrackList.tThirdParty"
                style="width: 600px"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="communication content">
              <el-input
                v-model="oppTrackList.tContactCondition"
                style="width: 615px"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="communication effect">
              <el-input
                v-model="oppTrackList.tContactEffect"
                style="width: 615px"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-main>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addTrackDataForm = false" fixed="right"
            >Cancel</el-button
          >
          <el-button
            type="danger"
            @click="
              addTrackDataForm = false;
              addItem(trackData, oppTrackList);
            "
            fixed="right"
            >confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-dialog>
</template>


<script>
import { defineComponent, reactive, toRefs ,onMounted } from "vue";
import { ElMessageBox, ElNotification } from "element-plus";

export default defineComponent({
  setup() {
    const state = reactive({
      keyword: "",
      types: [],
      typeVal: "",
      loading: true,
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: "",
      rowNumber: 0,

      formLabelWidth: "200px",

      addChanceForm: false,
      addSonChanceForm: false,
      addCompetitorForm: false,
      addDeciderForm: false,
      addTrackDataForm: false,
      detailDataForm: false,
      trackChanceForm: false,
      detailData: [],

      addOrUpdateState: 0,
      addOrUpdateList: {},

      customer: [],
      opportunity: [],

      categoryData: [],
      compData: [],
      competeData: [],
      decideData: [],
      payerData: [],
      input1: "",
      input2: "",

      search: [],
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      value1: "",
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
        state.emp_position = window.sessionStorage.getItem('position');
        console.log(state.emp_info);
    }

    return {
      ...toRefs(state),
      init
    };
  
  },

  data() {
    return {
      opp_cigarettes: true,

      chanceName: "",
      chanceNumber: "",
      trackData: [],
      oppPhase: "",
      oppPhaseId: "",
      loading: true,

      activeNumber: 1,

      addType: "",
      addChance: {},
      chanceData: [],
      competeData: [],
      payerData: [],
      newSonChance: {},

      newCompetitor: {},

      newDecider: {},
      deptOptions: [],
      empOptions: [],
      oppDeptOptions: [],

      oppTrackList: {
        tId: "",
        oppId: "",
        tType: "",
        tContactWay: "",
        tDate: "",
        tOurParty: "",
        tCusParty: "",
        tThirdParty: "",
        tContactCondition: "",
        tContactEffect: "",
      },
    };
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },

    addRow(itemRows, rowsItem) {
      var length = itemRows.length;
      itemRows.splice(length, 0, rowsItem);
    },

    addItem(itemRows, rowsItem) {
      this.addRow(itemRows, rowsItem);
      rowsItem = [];
    },

    changeActive(index) {
      var target = this.tableData[index];
      this.detailData.oppPhase = target.oppPhase;
      if (this.detailData.oppPhase == "E") {
        this.oppPhaseId = 1;
      } else if (this.detailData.oppPhase == "D") {
        this.oppPhaseId = 2;
      } else if (this.detailData.oppPhase == "C") {
        this.oppPhaseId = 3;
      } else if (this.detailData.oppPhase == "B") {
        this.oppPhaseId = 4;
      } else if (this.detailData.oppPhase == "A") {
        this.oppPhaseId = 5;
      } else if (this.detailData.oppPhase == "S") {
        this.oppPhaseId = 6;
      } else {
        this.oppPhaseId = 0;
      }
    },

    getMainPage() {
      this.axios
        .get("http://localhost:14000/oppManagement/oppManagement/opportunity/getMainPage", {
          params: { empId: this.emp_info.empId,access_token:this.emp_info.access_token },
        })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.obj.oppSearchResultList;

          this.deptOptions = res.data.obj.deptInfoList;
          this.empOptions = res.data.obj.empInfoList;
          this.oppDeptOptions = res.data.obj.oppBelongingList;

          this.loading = false;
        });
    },

    getChanceDetail(index) {
      var target = this.tableData[index];
      this.axios
        .get("http://localhost:14000/oppManagement/oppManagement/opportunity/showOppDetail", {
          params: {
            oppId: target.oppId,
            empId: this.emp_info.empId,
            access_token:this.emp_info.access_token,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.detailData = res.data.obj.opportunity;
          this.categoryData = res.data.obj.subOpportunityList;
          this.compData = res.data.obj.competitorList;
          this.decideData = res.data.obj.payerList;
          this.trackData = res.data.obj.oppTrackList;
        });
    },

    testAddRepetition() {
      this.axios
        .get(
          "http://localhost:14000/oppManagement/oppManagement/opportunity/testAddRepetition",
          {
            params: {
              
              oppbName: this.addChance.oppbName,
              access_token:this.emp_info.access_token
            },
          }
        )
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.msg != "ok") {
            this.$notify.error({
              message: "Opportunity name already exists",
              showClose: true,
              type: "fail",
            });
          } else if (res.data.msg == "ok") {
            this.$notify(
              this.$message({
                message: "Opportunity names can be used",
                showClose: true,
                type: "success",
              })
            );
          }
        });
    },

    Finish1() {
      this.addChance.oppbCusId = "800001";
      this.addChance.oppbCustomerManagerId = "800123";
      this.addChance.oppbSalesDept = "8021140";
      if (this.addOrUpdateState == 0) {
        this.axios
          .post(
            "http://localhost:14000/oppManagement/oppManagement/opportunity/addOpportunity",
            {
              type: this.addType,
              opportunityBuffer: this.addChance,
              subOpportunityBufferList: this.chanceData,
              competitorBufferList: this.competeData,
              payerBufferList: this.payerData,},
            // {
            //   type: "1",
            //   opportunityBuffer: {
            //       oppbName:"addOpp1",
            //       oppbCusId:"800001"
            //   },
            //   subOpportunityBufferList: [],
            //   competitorBufferList: [],
            //   payerBufferList: []
            // },

              {params:{access_token:this.emp_info.access_token}}
          )
          .then(() => {
            ElNotification({
              title: "system hint",
              message: "Opportunity addition has been submitted, please wait for approval!",
              duration: 2000,
              type: "success",
            });
          });
      }
      if (this.addOrUpdateState == 1) {
          this.axios
            .post(
              "http://localhost:14000/oppManagement/cusManagement/customer/updateOpportunity",
              {
                customer: this.addCustomer,
                contactsList: this.addContact,
                relationList: this.addRelated,
              },{params:{access_token:this.emp_info.access_token}}
            )
            .then(() => {
              ElNotification({
                title: "system hint",
                message: "added successfully",
                duration: 2000,
                type: "success",
              });
            });
      }
    },

    Finish3() {
      this.addChance.oppbCusId = '800001';
      this.axios
        .post(
          "http://localhost:14000/oppManagement/oppManagement/opportunity/addOpportunity",
          {
            type: "0",
            opportunityBuffer: this.addChance,
            subOpportunityBufferList: this.chanceData,
            competitorBufferList: this.competeData,
            payerBufferList: this.prayerData,
          },{params:{access_token:this.emp_info.access_token}}
        )
        .then((res) => {
          console.log("res data" + res.data);
          ElNotification({
            title: "system hint",
            message: "Saved successfully",
            duration: 2000,
            type: "success",
          });
        });
    },

    Finish2() {
      if (this.addOrUpdateState == 0) {
        this.axios
          .post(
            "http://localhost:14000/oppManagement/oppManagement/opportunity/curdTrackinglog",
            {
              oppTrackList: this.oppTrackList,
            },{params:{access_token:this.emp_info.access_token}}
          )
          .then(() => {
            ElNotification({
              title: "system hint",
              message: "added successfully",
              duration: 2000,
              type: "success",
            });
          });
      }
      if (this.addOrUpdateState == 1) {
        this.axios
          .post(
            "http://localhost:14000/oppManagement/oppManagement/customer/curdTrackinglog",
            {
              oppTrackList: this.oppTrackList,
            },{params:{access_token:this.emp_info.access_token}}
          )
          .then(() => {
            ElNotification({
              title: "system hint",
              message: "added successfully",
              duration: 2000,
              type: "success",
            });
          });
      }
    },

    getChanceTrack(index) {
      var target = this.tableData[index];
      this.axios
        .get(
          "http://localhost:14000/oppManagement/oppManagement/opportunity/getOppTrackMainPage",
          {
            params: { oppId: target.oppId,access_token:this.emp_info.access_token },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.chanceNumber = res.data.obj.oppId;
          this.chanceName = res.data.obj.oppName;
          this.trackData = res.data.obj.oppTrackList;
        });
    },

    addOrUpdate() {
      if (this.addOrUpdateState == 0) {
        this.addOrUpdateList = {
          ChanceTitle: "new opportunity",
          SonChanceTitle: "Add sub-opportunities",
          CompetitorTitle: "Add a competitor",
          DeciderTitle: "Add purchase decision maker",
          TrackDataTitle: "Add opportunity tracking",
        };
      }
      if (this.addOrUpdateState == 1) {
        this.addOrUpdateList = {
          ChanceTitle: "Edit opportunity",
          SonChanceTitle: "Edit sub-opportunities",
          CompetitorTitle: "Edit competitor",
          DeciderTitle: "Edit Buying Decision Maker",
          TrackDataTitle: "Edit Opportunity Tracking",
        };
      }
    },

    deleteRow(index, rows) {
      ElMessageBox.confirm("This piece of data will be permanently deleted, confirm deletion?", "hint", {
        confirmButtonText: "confirm",
        cancelButtonText: "Cancel",
        type: "warning",
        callback: (action) => {
          if ("confirm" == action) {
            rows.splice(index, 1);
            // init()
            ElNotification({
              title: "system hint",
              message: "Deleted successfully",
              duration: 2000,
              type: "success",
            });
          }
        },
      });
    },

    notification(str) {
      ElNotification({
        title: "system hint",
        message: str,
        duration: 2000,
        type: "success",
      });
    },
  },
});
</script>

<style lang="less">
@import "../common/style/common";

// .el-input__inner{
//     width: 200px;
// }
.chance {
  .content-main {
    .table-image {
      width: 45px;
      height: 45px;
    }
  }
}
.el-drawer__body {
  overflow-y: auto !important;
}
/* #eldrawer{
    overflow-y: auto
  } */
</style>