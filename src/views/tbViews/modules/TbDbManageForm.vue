<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="字段名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldName">
              <a-input v-model="model.fieldName" placeholder="请输入字段名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字段类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldType">
              <a-input v-model="model.fieldType" placeholder="请输入字段类型"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字段长度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldLength">
              <a-input v-model="model.fieldLength" placeholder="请输入字段长度"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="主键" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="primaryKey">
              <a-input v-model="model.primaryKey" placeholder="请输入主键"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="外键" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="foreignKey">
              <a-input v-model="model.foreignKey" placeholder="请输入外键"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="索引" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tbIndex">
              <a-input v-model="model.tbIndex" placeholder="请输入索引"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="表名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tbName">
              <a-input v-model="model.tbName" placeholder="请输入表名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark">
              <j-editor v-model="model.remark" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字段是否必填" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldIsNull">
              <a-input v-model="model.fieldIsNull" placeholder="请输入字段是否必填"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字典ID" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="dictId">
              <a-input v-model="model.dictId" placeholder="请输入字典ID"  ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

import {httpAction} from '@/api/manage'

export default {
    name: 'TbDbManageForm',
    components: {
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        model:{
         },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
        },
        url: {
          add: "/tbDbManage/tbDbManage/add",
          edit: "/tbDbManage/tbDbManage/edit",
          queryById: "/tbDbManage/tbDbManage/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
       //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
         
        })
      },
    }
  }
</script>