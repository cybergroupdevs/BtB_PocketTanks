define({ "api": [
  {
    "type": "post",
    "url": "/emailverification",
    "title": "Verify user's Registered Email Id",
    "name": "CVerify_user_s_email_ID",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "emailVerified",
            "description": "<p>Email Verified should be true if email is verified by user else false</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User has verified the email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n  \"success\": true,\n  \"status\": 200,\n  \"message\": \"Email Id is verified successfully\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>If user's email ID is incorrect or email verified is false then user wont be able to get verified.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n   {\n  \"success\": false,\n  \"status\": 400,\n  \"message\": \"Email Id is incorrect\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/apidoc/emailVerification.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/changepassword",
    "title": "Change Password for the user after login",
    "name": "Change_Old_Password",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User's old password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User's new password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Confirmation of changing the old password to new.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n  \"success\": true,\n  \"status\": 200,\n  \"message\": \"Password is changed successfully\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>If user's old password and new password is same then user wont be able to change password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n   {\n  \"success\": false,\n  \"status\": 400,\n  \"message\": \"User's old password and new password is same\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/apidoc/changePassword.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/forgotpassword",
    "title": "Forgot Password for the user",
    "name": "Forgot_Password",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Confirmation of sending the forgot password link.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n  \"success\": true,\n  \"status\": 200,\n  \"message\": \"Forgot password link has been sent\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "message",
            "description": "<p>If user's email is not verified then user wont be able to send email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 404 Not Found\n   {\n  \"success\": false,\n  \"status\": 400,\n  \"message\": \"User's email is not verified yet\",\n  \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/apidoc/forgotPassword.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login user",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>Full Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Unique token of the user for login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userid of the user which is unique in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n {\n \"success\": true,\n \"status\": 200,\n \"message\": \"\",\n \"data\": {\n     \"userId\": \"5dea21c259d7021983ee6e69\",\n     \"fullName\": \"John Wickman\",\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVhMjFjMjU5ZDcwMjE5ODNlZTZlNjkiLCJpYXQiOjE1NzU4Nzg4Mzl9.ZrKZ1F0gbbjejVrLElKtEx0VdoaneO7fAQVhNm-p3iE\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "emailNotFound",
            "description": "<p>The email id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"status\": 400,\n  \"message\": \"Email Field is empty\",\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/apidoc/forgotPasswordChanged.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login user",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>Full Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Unique token of the user for login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userid of the user which is unique in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n {\n \"success\": true,\n \"status\": 200,\n \"message\": \"\",\n \"data\": {\n     \"userId\": \"5dea21c259d7021983ee6e69\",\n     \"fullName\": \"John Wickman\",\n     \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVhMjFjMjU5ZDcwMjE5ODNlZTZlNjkiLCJpYXQiOjE1NzU4Nzg4Mzl9.ZrKZ1F0gbbjejVrLElKtEx0VdoaneO7fAQVhNm-p3iE\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "emailNotFound",
            "description": "<p>The email id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User is not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"status\": 400,\n  \"message\": \"Email Field is empty\",\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/apidoc/login.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/registration",
    "title": "Register new user",
    "name": "Register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>User's full Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "emailVerified",
            "description": "<p>User's email is verified or not (true or false).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userid of the user which is unique in database.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>Full Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "emailVerified",
            "description": "<p>Whether user's email is verified or not (True or False).</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date and time when the user is created.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n \"success\": true,\n  \"status\": 200,\n \"message\": \"\",\n  \"data\": {\n      \"email\": \"test3456@gmail.com\",\n      \"fullName\": \"test\",\n      \"password\": \"$2b$10$j9USTqvc7GnvohItOPA.W.CRtSWv2BQinEgYKc3B/vJpiDYrIo0hi\",\n      \"emailVerified\": false,\n      \"createdAt\": \"2019-12-09T10:29:41.881Z\",\n      \"__v\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "emailNotFound",
            "description": "<p>The email id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "fullName",
            "description": "<p>Full Name of the User is not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User is not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "emailVerified",
            "description": "<p>Email Verification field is not found for the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"status\": 400,\n  \"message\": \"Password Field is empty\",\n  \"data\": null\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/apidoc/registration.js",
    "groupTitle": "User"
  }
] });
