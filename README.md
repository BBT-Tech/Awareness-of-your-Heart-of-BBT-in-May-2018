# 前后端对接文档
### 问题类型模块
- 触发事件：`用户点击某一类型模块时`
- 接口地址：`/dulishuo/backend/get_question.php`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "type": 0
        }
        ```
    - 说明：
        |参数名称|参数类型|参数说明|
        |-|-|-|
        |type|int|0代表大学，1代表自我，2代表世界。|
- 返回参数：
    - 示例：
        ```json
        {
            "errcode": 0,
            "errmsg": "",
            "question": [
                {
                    "text": "问题1",
                    "click": 22
                },
                {
                    "text": "问题2",
                    "click": 78
                }
            ]
        }
        ```
    - 说明：
        |参数名称|参数类型|参数说明|
        |-|-|-|
        |errcode|int|错误码。0代表成功，非0代表意外错误。|
        |errmsg|string|错误信息。|
        |question|array|相关问题信息的数组。|
        |text|string|问题的文本。|
        |click|int|问题被点击的次数。|
### 随机答案的获得
- 触发事件：`用户点击某一问题时`或`用户点击不满意时`
- 接口地址：`/dulishuo/backend/get_answer.php`
- 请求方法：`POST`
- 返回参数：
    - 示例：
        ```json
        {
            "errcode": 0,
            "errmsg": "",
            "answer": "随机回答"
        }
        ```
    - 说明：
        |参数名称|参数类型|参数说明|
        |-|-|-|
        |errcode|int|错误码。0代表成功，非0代表意外错误。|
        |errmsg|string|错误信息。|
        |answer|string|随机回答。|
### emmm，好像没有什么了，甚至连登录认证都不用了
### 完。\_(:зゝ∠)\_
    