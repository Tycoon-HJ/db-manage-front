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
            <a-form-model-item label="字段是否是字典" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldIsDictFlag">
              <j-dict-select-tag type="list" v-model="model.fieldIsDictFlag" dictCode="is_dict" placeholder="请选择字段是否是字典" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字段中文名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldNameCn">
              <a-input v-model="model.fieldNameCn" placeholder="请输入字段中文名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="字段长度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldLength">
              <a-input v-model="model.fieldLength" placeholder="请输入字段长度"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="关联字典" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fieldId">
              <a-input v-model="model.fieldId" placeholder="关联字典"  ></a-input>
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
    name: 'TbFieldManagerForm',
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
           fieldName: [
              { required: true, message: '请输入字段名称!'},
           ],
           fieldIsDictFlag: [
              { required: true, message: '请输入字段是否是字典!'},
           ],
           fieldNameCn: [
              { required: true, message: '请输入字段中文名!'},
           ],
           fieldLength: [
              { required: true, message: '请输入字段长度!'},
           ],
          fieldId: [
            { required: false, message: '请选择关联字典!'},
          ],
        },
        url: {
          add: "/tbFieldManager/tbFieldManager/add",
          edit: "/tbFieldManager/tbFieldManager/edit",
          queryById: "/tbFieldManager/tbFieldManager/queryById"
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