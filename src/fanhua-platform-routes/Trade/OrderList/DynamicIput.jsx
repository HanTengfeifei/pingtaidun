import React from 'react';
import { Form, Input, Icon, Button,Row ,Col,Select} from 'antd';
import './DynamicInput.less';
const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  constructor(props){
    super(props);
    this.state={
      acount_all:0
    };
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const ObjAll = [];
        var  countAll=0;
        for (let i = 0; i < values.keys.length; i++) {
          let obj = {};
          obj.addr_id = values.name[values.keys[i]];
          obj.recv_sum = values.number[values.keys[i]];
          ObjAll.push(obj);
          countAll=countAll+parseInt(values.number[values.keys[i]]);
        }
        console.log(ObjAll);
        this.props.countAll(countAll);
        console.log(this.props.father);
        this.props.father.setState({
            station_all: ObjAll,
          });
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', {
      trigger:["onChange",'onBlur'],
      initialValue: []
    });
    const keys = getFieldValue('keys');
    console.log(keys);
    const formItems = keys.map((k, index) => {
      return (
        <div>
          <Row>
            <Col span={10}>
         <FormItem
          {... formItemLayout }
          // label={index === 0 ? '场站地址' : ''}
          labelCol={{span: 4}}
          required={false}
          key={k}
        >
          {getFieldDecorator(`name[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请选择场站和相应的购买量.",
            }],
          })(
            <Select  placeholder="购买地址" dropdownMatchSelectWidth={true} style={{ width: '60%', marginRight: 8 }}

            >{
            this.props.addr_select_all.map((item)=>{
            return  (<Option value={item.id} >{item.addr_name}</Option>);
          })
          }
            </Select>
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
            </Col>
            <Col span={4} pull={3}>
             <FormItem
               // label='购买量'
            >
              {getFieldDecorator(`number[${k}]`, {
                rules: [{
                  required: false, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input  addonAfter="吨" type="number"/>
              )}
            </FormItem>
            </Col>
          </Row>
       </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
          {formItems}
        <FormItem {... formItemLayout }>
          <Button type="dashed" onClick={this.add} style={{ width: '55%' }}>
            <Icon type="plus" /> 点击添加场站和购买量
          </Button>
        </FormItem>
        <FormItem {... formItemLayout }>
          <Button type="primary" htmlType="submit">点击计算总量和总价，计算后在下方核对确认提交</Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
export default  WrappedDynamicFieldSet;
