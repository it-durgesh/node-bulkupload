/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/
const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNTA4LTA5LTEwLTIwMjIgMDY6NDM6NTguMDI0LUdQQVktQ0EtMTEyMzQ1Njk0OCIsImV4cCI6MTY2NTMxMjI4NSwiaWF0IjoxNjY1Mjk3ODg1fQ.iBCfnn3Z_oREEqjYW2MigyIc2l3Dbr69OJXH3r6y75MmLN6KHVxQ2nmJZTVX60zCTC3tYndObXHLtpnaNF2vgQ";

const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => res.send("Sample Node API Version1"));
router.get("/health", (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: Date.now(),
    };
    res.send(JSON.stringify(healthcheck));
});
router.post("/generateOTP", (req, res) => {
    const generateOTP = {
        header: {
            channelId: "GPAY",
            requestId: "0957-09-10-2022 06:43:58.024-OTPGeneration",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "",
            actionType: "OTPGeneration",
            transactionStatus: "Success",
            serviceName: "Notification",
            journeyKey: "1123456948",
            journeySeq: "",
        },
        data: {
            mobileNo: "1123456948",
            otpGenTime: "",
            businessTransactionStatus: "COMPLETED",
            otpExpiryTime: "",
            ResMessage: "OTP Generated and sent to customer's mobileNo",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(generateOTP));
});
router.post("/verifyOTP", (req, res) => {
    res.header("AuthToken", token);
    //   const verifyOTP = {
    //       "header": {
    //           "channelId": "GPAY",
    //           "requestId": "0097-09-10-2022 06:44:43.836-OTPValidation",
    //           "journeyId": "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
    //           "journeyName": "CA",
    //           "txnDtTm": "",
    //           "actionType": "OTPValidation",
    //           "transactionStatus": "Success",
    //           "journeyKey": "1123456948",
    //           "serviceName": "Notification"
    //       },
    //       "data": {
    //           "mobileNo": "1123456948",
    //           "ResMessage": "OTP Validated Successfully",
    //           "businessTransactionStatus": "COMPLETED"
    //       },
    //       "error": {
    //           "xcptnInfo": {
    //               "ustrd": [],
    //               "strd": []
    //           }
    //       }
    //   };

    const verifyOTP = {
        header: {
            journeyName: "CA",
            referenceNo: "",
            transactionStatus: "Success",
            transactionDtTm: "2022-10-07T07:10:21.924362",
            journeyId: "",
            serviceName: "otpService",
            actionType: "OTPValidation",
            replayIndicator: "N",
            requestId: "0630-20-06-2022 05:49:31.701-GenerateOTP",
            subServiceName: "otpGenSMS",
            sendertopic: "",
            kafkaOutputTopic: "ca_res_topic",
            restartFlow: "Y",
            channelId: "GPAY",
            journeyKey: "8520213456",
            lastActionType: "AadhaarOTPValidation",
            serviceCode: "otpService",
        },
        data: {
            mobileNo: "1123456948",
            ResMessage: "OTP Validated Successfully",
            businessTransactionStatus: "COMPLETED",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };

    res.send(JSON.stringify(verifyOTP));
});
router.post("/validatePan", (req, res) => {
    const validatePan = {
        data: {
            ResMessage: "PAN Validated Successfully",
            panNo: "AAAAA1234D",
            gstin: "DFCG1234",
            firstName: "TestGst",
            registeredAs: "RegGst",
            city: "testCity",
            state: "test State",
            registeredDate: "2022-10-09",
            addressLine2: "Testad2",
            addressLine1: "Testad1",
            addressLine3: "Testad3",
            businessTransactionStatus: "COMPLETED",
            emailid: "test@123",
            QandA: {
                "Are you a taxpayer in India?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "isTaxResidencyIndia",
                    },
                    userAnswer: "Yes",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                            errorMessage:
                                "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                        },
                    ],
                },
                "Are you a citizen of India, presently residing territory of India": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "isCitizenIndia",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                            errorMessage:
                                "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                        },
                    ],
                },
                "Are you a professional service provider": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "isSEP",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                            errorMessage:
                                "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                        },
                    ],
                },
                "Is registered address same as linked to GST Number?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "isRegAddEqualGstAdd",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                            errorMessage:
                                "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                        },
                    ],
                },
                "Do you want to avail Merchant services": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "No",
                        keyword: "isMerchantOnboardRequired",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                        },
                    ],
                },
                "Select your firm's constitutions": {
                    properties: {
                        type: "DropDown",
                        isMandatory: true,
                        showDefault: "Proprietor",
                        keyword: "constitutionType",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Proprietor",
                        },
                        {
                            option: "Individual",
                            errorMessage:
                                "You will be redirected to another web page where you can restart your application process.",
                        },
                    ],
                },
                "Select Annual Turn Over": {
                    properties: {
                        type: "DropDown",
                        isMandatory: true,
                        showDefault: "<5cr",
                        keyword: "annualTurnover",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "<5cr",
                        },
                        {
                            option: ">5cr",
                        },
                    ],
                },
                "Any loan avail from other bank": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "No",
                        keyword: "isCCAvailed",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                            errorMessage: "Please Accept the undertaking and proceed.",
                        },
                        {
                            option: "No",
                        },
                    ],
                },
                "Any other facility like LC or BG availed from other bank?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "No",
                        keyword: "isOtherFacility",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                            errorMessage: "Please Accept the undertaking and proceed.",
                        },
                        {
                            option: "No",
                        },
                    ],
                },
                "Is your firm involved in Export Import": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "No",
                        keyword: "whetherInvolvedInImportExport",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                        },
                    ],
                },
                "Nature of Business": {
                    properties: {
                        type: "DropDown",
                        isMandatory: true,
                        keyword: "natureOfBusiness",
                    },
                    userAnswer: "Manufacturing",
                    values: [
                        {
                            option: "Manufacturing",
                        },
                        {
                            option: "Service Provider",
                        },
                        {
                            option: "Stock Brokers",
                        },
                        {
                            option: "Real Estate",
                        },
                        {
                            option: "Wholesale Trading",
                        },
                        {
                            option: "Others",
                            children: {
                                Others: {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: true,
                                        keyword: "nobOthers",
                                    },
                                    values: null,
                                },
                            },
                        },
                    ],
                },
                "Details of activity(category)": {
                    properties: {
                        type: "DropDown",
                        isMandatory: true,
                        keyword: "detailOfBusinessActivity",
                    },
                    userAnswer: "AUTOMOTIVE",
                    values: [
                        {
                            option: "AUTOMOTIVE",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "AUTO SERVICE SHOPS/NON DEALER",
                                    values: [
                                        {
                                            option: "AUTO SERVICE SHOPS/NON DEALER",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "Automobile",
                                                    values: [
                                                        {
                                                            option: "Automobile",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "AUTOMOTIVE PARTS STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Automobile",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "AUTOMOTIVE TIRE STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Automobile",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "CAR WASHES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Automobile",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "MOTORCYCLE DEALERS",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Automobile",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "TOWING SERVICES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Automobile",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "APPAREL & ACCESSORIES",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "FAMILY CLOTHING STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Textiles/Garments",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "FURRIERS AND FUR SHOPS",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Textiles/Garments",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "MISC APPAREL/ACCESS STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Textiles/Garments",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "SHOE STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Textiles/Garments",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "SPORTS/RIDING APPAREL STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Textiles/Garments",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "WOMENS READY TO WEAR STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Textiles/Garments",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "BUSINESS TO BUSINESS",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "ADVERTISING SERVICES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Advt Agencies.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "CONSTRUCTION MATERIALS - DEF",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Construction.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "DEPARTMENT STORES",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "DEPARTMENT STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "MISC SPECIALTY RETAIL",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables..",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "DIRECT MARKETING",
                            children: {
                                children: {
                                    "Details of activity(sub-category)": {
                                        properties: {
                                            type: "DropDown",
                                            isMandatory: true,
                                            keyword: "detailOfBusinessSubActivity",
                                        },
                                        userAnswer: "",
                                        values: [
                                            {
                                                option: "DIRECT MKTG-TRAVEL RELATED ARR",
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Advt Agencies.",
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                option: "DIRECT SELL/DOOR-TO-DOOR",
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Advt Agencies.",
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            option: "DISCOUNT STORES",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "DISCOUNT STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "MISC GENERAL MERCHANDISE",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "VARIETY STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "EDUCATION",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "BUSINESS/SECRETARIAL SCHOOL",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "EDUCATION",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "COLLEGES/UNIV/JC/PROFESSION",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "EDUCATION",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "CORRESPONDENCE SCHOOLS",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "EDUCATION",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "ELEMENTARY/SECONDARY SCHOOLS",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "EDUCATION",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "TRADE/VOCATIONAL SCHOOLS",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "EDUCATION",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "FOOD & GROCERY",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "BAKERIES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "DAIRY PRODUCT STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "FREEZER/MEAT LOCKERS",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "MISC FOOD STORES - DEFAULT",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "PKG STORES/BEER/WINE/LIQUOR",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "HOME IMPROVEMENT & SUPPLY",
                            children: {
                                "Details of activity(sub-category)": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        keyword: "detailOfBusinessSubActivity",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "FURNITURE/EQUIP STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "HARDWARE STORES",
                                            children: {
                                                "Industry to which Firms activity belongs to": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        keyword: "natureOfIndustry",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Consumer Durables.",
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
                "Do you have second proof of entity details?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "isSecondEntityProof",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                            children: {
                                "Select second entity details": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: false,
                                        keyword: "secondEntityType",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "License / Registration certificate",
                                        },
                                        {
                                            option:
                                                "shop & establishment certificate / Trade License",
                                        },
                                    ],
                                },
                                "Enter document number": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: false,
                                        showDefault: "1234",
                                        keyword: "secondEntityDocValue",
                                    },
                                    userAnswer: "321",
                                    values: null,
                                },
                                "Project Sponser": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: false,
                                        showDefault: "RANA",
                                        keyword: "projectSponser",
                                    },
                                    userAnswer: "Els",
                                    values: null,
                                },
                            },
                        },
                        {
                            option: "No",
                            errorMessage: "Please Accept the undertaking and proceed.",
                        },
                    ],
                },
                "Is Firms mailing address same as Registered address of firm": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: false,
                        showDefault: "Yes",
                        keyword: "ismailingAddEqualRegAdd",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                        },
                    ],
                },
                "Is Firms mailing address same as second entity proof": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: false,
                        showDefault: "No",
                        keyword: "isFirmMailingAddEqualSecondEntityPrf",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                            children: {
                                "Address as per second entity proof": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: true,
                                        keyword: "mailAddressline1",
                                        showDefault: "Loadha Nasik",
                                    },
                                    values: null,
                                },
                                "State as per second entity proof": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: true,
                                        keyword: "mailState",
                                        showDefault: "Maharashtra",
                                    },
                                    values: null,
                                },
                                "City as per second entity proof": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: true,
                                        keyword: "mailCity",
                                        showDefault: "Mumbai",
                                    },
                                    values: null,
                                },
                                "Pincode as per second entity proof": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: true,
                                        keyword: "mailPinCode",
                                        showDefault: "400607",
                                    },
                                    values: null,
                                },
                            },
                        },
                        {
                            option: "No",
                        },
                    ],
                },
            },
        },
        header: {
            channelId: "GPAY",
            requestId: "0966-09-10-2022 06:45:24.495-PANValidation",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:45:26.683743",
            actionType: "PANValidation",
            transactionStatus: "Success",
            journeyKey: "1123456948",
            serviceName: "Notification",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(validatePan));
});
router.post("/qanda", (req, res) => {
    const QandA = {
        "Are you a taxpayer in India?": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "Yes",
                keyword: "isTaxResidencyIndia",
            },
            userAnswer: "Yes",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                    errorMessage:
                        "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                },
            ],
        },
        "Are you a citizen of India, presently residing territory of India": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "Yes",
                keyword: "isCitizenIndia",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                    errorMessage:
                        "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                },
            ],
        },
        "Are you a professional service provider": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "Yes",
                keyword: "isSEP",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                    errorMessage:
                        "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                },
            ],
        },
        "Is registered address same as linked to GST Number?": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "Yes",
                keyword: "isRegAddEqualGstAdd",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                    errorMessage:
                        "We cannot proceed with current account opening online however Bank representative will contact you for assistance.",
                },
            ],
        },
        "Do you want to avail Merchant services": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "No",
                keyword: "isMerchantOnboardRequired",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                },
            ],
        },
        "Select your firm's constitutions": {
            properties: {
                type: "DropDown",
                isMandatory: true,
                showDefault: "Proprietor",
                keyword: "constitutionType",
            },
            userAnswer: "",
            values: [
                {
                    option: "Proprietor",
                },
                {
                    option: "Individual",
                    errorMessage:
                        "You will be redirected to another web page where you can restart your application process.",
                },
            ],
        },
        "Select Annual Turn Over": {
            properties: {
                type: "DropDown",
                isMandatory: true,
                showDefault: "<5cr",
                keyword: "annualTurnover",
            },
            userAnswer: "",
            values: [
                {
                    option: "<5cr",
                },
                {
                    option: ">5cr",
                },
            ],
        },
        "Any loan avail from other bank": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "No",
                keyword: "isCCAvailed",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                    errorMessage: "Please Accept the undertaking and proceed.",
                },
                {
                    option: "No",
                },
            ],
        },
        "Any other facility like LC or BG availed from other bank?": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "No",
                keyword: "isOtherFacility",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                    errorMessage: "Please Accept the undertaking and proceed.",
                },
                {
                    option: "No",
                },
            ],
        },
        "Is your firm involved in Export Import": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "No",
                keyword: "whetherInvolvedInImportExport",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                },
            ],
        },
        "Nature of Business": {
            properties: {
                type: "DropDown",
                isMandatory: true,
                keyword: "natureOfBusiness",
            },
            userAnswer: "Manufacturing",
            values: [
                {
                    option: "Manufacturing",
                },
                {
                    option: "Service Provider",
                },
                {
                    option: "Stock Brokers",
                },
                {
                    option: "Real Estate",
                },
                {
                    option: "Wholesale Trading",
                },
                {
                    option: "Others",
                    children: {
                        Others: {
                            properties: {
                                type: "InputBox",
                                isMandatory: true,
                                keyword: "nobOthers",
                            },
                            values: null,
                        },
                    },
                },
            ],
        },
        "Details of activity(category)": {
            properties: {
                type: "DropDown",
                isMandatory: true,
                keyword: "detailOfBusinessActivity",
            },
            userAnswer: "AUTOMOTIVE",
            values: [
                {
                    option: "AUTOMOTIVE",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "AUTO SERVICE SHOPS/NON DEALER",
                            values: [
                                {
                                    option: "AUTO SERVICE SHOPS/NON DEALER",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "Automobile",
                                            values: [
                                                {
                                                    option: "Automobile",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "AUTOMOTIVE PARTS STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Automobile",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "AUTOMOTIVE TIRE STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Automobile",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "CAR WASHES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Automobile",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "MOTORCYCLE DEALERS",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Automobile",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "TOWING SERVICES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Automobile",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "APPAREL & ACCESSORIES",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "FAMILY CLOTHING STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Textiles/Garments",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "FURRIERS AND FUR SHOPS",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Textiles/Garments",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "MISC APPAREL/ACCESS STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Textiles/Garments",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "SHOE STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Textiles/Garments",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "SPORTS/RIDING APPAREL STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Textiles/Garments",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "WOMENS READY TO WEAR STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Textiles/Garments",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "BUSINESS TO BUSINESS",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "ADVERTISING SERVICES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Advt Agencies.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "CONSTRUCTION MATERIALS - DEF",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Construction.",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "DEPARTMENT STORES",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "DEPARTMENT STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "MISC SPECIALTY RETAIL",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables..",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "DIRECT MARKETING",
                    children: {
                        children: {
                            "Details of activity(sub-category)": {
                                properties: {
                                    type: "DropDown",
                                    isMandatory: true,
                                    keyword: "detailOfBusinessSubActivity",
                                },
                                userAnswer: "",
                                values: [
                                    {
                                        option: "DIRECT MKTG-TRAVEL RELATED ARR",
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Advt Agencies.",
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        option: "DIRECT SELL/DOOR-TO-DOOR",
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Advt Agencies.",
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
                {
                    option: "DISCOUNT STORES",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "DISCOUNT STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "MISC GENERAL MERCHANDISE",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "VARIETY STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "EDUCATION",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "BUSINESS/SECRETARIAL SCHOOL",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "EDUCATION",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "COLLEGES/UNIV/JC/PROFESSION",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "EDUCATION",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "CORRESPONDENCE SCHOOLS",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "EDUCATION",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "ELEMENTARY/SECONDARY SCHOOLS",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "EDUCATION",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "TRADE/VOCATIONAL SCHOOLS",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "EDUCATION",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "FOOD & GROCERY",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "BAKERIES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "DAIRY PRODUCT STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "FREEZER/MEAT LOCKERS",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "MISC FOOD STORES - DEFAULT",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "PKG STORES/BEER/WINE/LIQUOR",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    option: "HOME IMPROVEMENT & SUPPLY",
                    children: {
                        "Details of activity(sub-category)": {
                            properties: {
                                type: "DropDown",
                                isMandatory: true,
                                keyword: "detailOfBusinessSubActivity",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "FURNITURE/EQUIP STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                                {
                                    option: "HARDWARE STORES",
                                    children: {
                                        "Industry to which Firms activity belongs to": {
                                            properties: {
                                                type: "DropDown",
                                                isMandatory: true,
                                                keyword: "natureOfIndustry",
                                            },
                                            userAnswer: "",
                                            values: [
                                                {
                                                    option: "Consumer Durables.",
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
        "Do you have second proof of entity details?": {
            properties: {
                type: "RadioButton",
                isMandatory: true,
                showDefault: "Yes",
                keyword: "isSecondEntityProof",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                    children: {
                        "Select second entity details": {
                            properties: {
                                type: "DropDown",
                                isMandatory: false,
                                keyword: "secondEntityType",
                            },
                            userAnswer: "",
                            values: [
                                {
                                    option: "License / Registration certificate",
                                },
                                {
                                    option:
                                        "shop & establishment certificate / Trade License",
                                },
                            ],
                        },
                        "Enter document number": {
                            properties: {
                                type: "InputBox",
                                isMandatory: false,
                                showDefault: "1234",
                                keyword: "secondEntityDocValue",
                            },
                            userAnswer: "321",
                            values: null,
                        },
                        "Project Sponser": {
                            properties: {
                                type: "InputBox",
                                isMandatory: false,
                                showDefault: "RANA",
                                keyword: "projectSponser",
                            },
                            userAnswer: "Els",
                            values: null,
                        },
                    },
                },
                {
                    option: "No",
                    errorMessage: "Please Accept the undertaking and proceed.",
                },
            ],
        },
        "Is Firms mailing address same as Registered address of firm": {
            properties: {
                type: "RadioButton",
                isMandatory: false,
                showDefault: "Yes",
                keyword: "ismailingAddEqualRegAdd",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                },
                {
                    option: "No",
                },
            ],
        },
        "Is Firms mailing address same as second entity proof": {
            properties: {
                type: "RadioButton",
                isMandatory: false,
                showDefault: "No",
                keyword: "isFirmMailingAddEqualSecondEntityPrf",
            },
            userAnswer: "",
            values: [
                {
                    option: "Yes",
                    children: {
                        "Address as per second entity proof": {
                            properties: {
                                type: "InputBox",
                                isMandatory: true,
                                keyword: "mailAddressline1",
                                showDefault: "Loadha Nasik",
                            },
                            values: null,
                        },
                        "State as per second entity proof": {
                            properties: {
                                type: "InputBox",
                                isMandatory: true,
                                keyword: "mailState",
                                showDefault: "Maharashtra",
                            },
                            values: null,
                        },
                        "City as per second entity proof": {
                            properties: {
                                type: "InputBox",
                                isMandatory: true,
                                keyword: "mailCity",
                                showDefault: "Mumbai",
                            },
                            values: null,
                        },
                        "Pincode as per second entity proof": {
                            properties: {
                                type: "InputBox",
                                isMandatory: true,
                                keyword: "mailPinCode",
                                showDefault: "400607",
                            },
                            values: null,
                        },
                    },
                },
                {
                    option: "No",
                },
            ],
        },
    }
    res.send(JSON.stringify(QandA));
})
router.post("/entitydetails", (req, res) => {
    let entitydetails;
    // BranchDetailsCapture && EntityDetailsCapture
    if (req.body.header.actionType === "EntityDetailsCapture") {
        entitydetails = {
            data: {
                ResMessage: "Entity details has been captured succesfully",
                businessTransactionStatus: "COMPLETED",
                BranchDetails: {
                    recommendedBranch: [
                        {
                            branchName: "Bellandur",
                            branchId: "422",
                            Address: "Block No 12, Lower Ground Flr Bellandur",
                            branchCity: "Bengaluru",
                            branchState: "Karnataka",
                            branchPinCode: "560037",
                            branchCountry: "India",
                        },
                        {
                            branchName: "Bellandur",
                            branchId: "423",
                            Address: "No 7, Vivekananda layout, Munnekola, Marathalli",
                            branchCity: "Bengaluru",
                            branchState: "Karnataka",
                            branchPinCode: "560037",
                            branchCountry: "India",
                        },
                        {
                            branchName: "Bellandur",
                            branchId: "424",
                            Address: "No 7, Chodeshwari Layout, Munnekolala, Marathalli",
                            branchCity: "Bengaluru",
                            branchState: "Karnataka",
                            branchPinCode: "560037",
                            branchCountry: "India",
                        },
                        {
                            branchName: "Bellandur",
                            branchId: "425",
                            Address: "Ground Floor, Outer Ring Road,  Hemanth Nagar",
                            branchCity: "Bengaluru",
                            branchState: "Karnataka",
                            branchPinCode: "560037",
                            branchCountry: "India",
                        },
                    ],
                    states: [
                        {
                            name: "Andhra Pradesh",
                            districts: [
                                "Anantapur",
                                "Chittoor",
                                "East Godavari",
                                "Guntur",
                                "Krishna",
                                "Kurnool",
                                "Nellore",
                                "Prakasam",
                                "Srikakulam",
                                "Visakhapatnam",
                                "Vizianagaram",
                                "West Godavari",
                                "YSR Kadapa",
                            ],
                        },
                        {
                            name: "Arunachal Pradesh",
                            districts: [
                                "Tawang",
                                "West Kameng",
                                "East Kameng",
                                "Papum Pare",
                                "Kurung Kumey",
                                "Kra Daadi",
                                "Lower Subansiri",
                                "Upper Subansiri",
                                "West Siang",
                                "East Siang",
                                "Siang",
                                "Upper Siang",
                                "Lower Siang",
                                "Lower Dibang Valley",
                                "Dibang Valley",
                                "Anjaw",
                                "Lohit",
                                "Namsai",
                                "Changlang",
                                "Tirap",
                                "Longding",
                            ],
                        },
                        {
                            name: "Assam",
                            districts: [
                                "Baksa",
                                "Barpeta",
                                "Biswanath",
                                "Bongaigaon",
                                "Cachar",
                                "Charaideo",
                                "Chirang",
                                "Darrang",
                                "Dhemaji",
                                "Dhubri",
                                "Dibrugarh",
                                "Goalpara",
                                "Golaghat",
                                "Hailakandi",
                                "Hojai",
                                "Jorhat",
                                "Kamrup Metropolitan",
                                "Kamrup",
                                "Karbi Anglong",
                                "Karimganj",
                                "Kokrajhar",
                                "Lakhimpur",
                                "Majuli",
                                "Morigaon",
                                "Nagaon",
                                "Nalbari",
                                "Dima Hasao",
                                "Sivasagar",
                                "Sonitpur",
                                "South Salmara-Mankachar",
                                "Tinsukia",
                                "Udalguri",
                                "West Karbi Anglong",
                            ],
                        },
                        {
                            name: "Bihar",
                            districts: [
                                "Araria",
                                "Arwal",
                                "Aurangabad",
                                "Banka",
                                "Begusarai",
                                "Bhagalpur",
                                "Bhojpur",
                                "Buxar",
                                "Darbhanga",
                                "East Champaran (Motihari)",
                                "Gaya",
                                "Gopalganj",
                                "Jamui",
                                "Jehanabad",
                                "Kaimur (Bhabua)",
                                "Katihar",
                                "Khagaria",
                                "Kishanganj",
                                "Lakhisarai",
                                "Madhepura",
                                "Madhubani",
                                "Munger (Monghyr)",
                                "Muzaffarpur",
                                "Nalanda",
                                "Nawada",
                                "Patna",
                                "Purnia (Purnea)",
                                "Rohtas",
                                "Saharsa",
                                "Samastipur",
                                "Saran",
                                "Sheikhpura",
                                "Sheohar",
                                "Sitamarhi",
                                "Siwan",
                                "Supaul",
                                "Vaishali",
                                "West Champaran",
                            ],
                        },
                        {
                            name: "Chandigarh (UT)",
                            districts: ["Chandigarh"],
                        },
                        {
                            name: "Chhattisgarh",
                            districts: [
                                "Balod",
                                "Baloda Bazar",
                                "Balrampur",
                                "Bastar",
                                "Bemetara",
                                "Bijapur",
                                "Bilaspur",
                                "Dantewada (South Bastar)",
                                "Dhamtari",
                                "Durg",
                                "Gariyaband",
                                "Janjgir-Champa",
                                "Jashpur",
                                "Kabirdham (Kawardha)",
                                "Kanker (North Bastar)",
                                "Kondagaon",
                                "Korba",
                                "Korea (Koriya)",
                                "Mahasamund",
                                "Mungeli",
                                "Narayanpur",
                                "Raigarh",
                                "Raipur",
                                "Rajnandgaon",
                                "Sukma",
                                "Surajpur  ",
                                "Surguja",
                            ],
                        },
                        {
                            name: "Dadra and Nagar Haveli (UT)",
                            districts: ["Dadra & Nagar Haveli"],
                        },
                        {
                            name: "Daman and Diu (UT)",
                            districts: ["Daman", "Diu"],
                        },
                        {
                            name: "Delhi (NCT)",
                            districts: [
                                "Central Delhi",
                                "East Delhi",
                                "New Delhi",
                                "North Delhi",
                                "North East  Delhi",
                                "North West  Delhi",
                                "Shahdara",
                                "South Delhi",
                                "South East Delhi",
                                "South West  Delhi",
                                "West Delhi",
                            ],
                        },
                        {
                            name: "Goa",
                            districts: ["North Goa", "South Goa"],
                        },
                        {
                            name: "Gujarat",
                            districts: [
                                "Ahmedabad",
                                "Amreli",
                                "Anand",
                                "Aravalli",
                                "Banaskantha (Palanpur)",
                                "Bharuch",
                                "Bhavnagar",
                                "Botad",
                                "Chhota Udepur",
                                "Dahod",
                                "Dangs (Ahwa)",
                                "Devbhoomi Dwarka",
                                "Gandhinagar",
                                "Gir Somnath",
                                "Jamnagar",
                                "Junagadh",
                                "Kachchh",
                                "Kheda (Nadiad)",
                                "Mahisagar",
                                "Mehsana",
                                "Morbi",
                                "Narmada (Rajpipla)",
                                "Navsari",
                                "Panchmahal (Godhra)",
                                "Patan",
                                "Porbandar",
                                "Rajkot",
                                "Sabarkantha (Himmatnagar)",
                                "Surat",
                                "Surendranagar",
                                "Tapi (Vyara)",
                                "Vadodara",
                                "Valsad",
                            ],
                        },
                        {
                            name: "Haryana",
                            districts: [
                                "Ambala",
                                "Bhiwani",
                                "Charkhi Dadri",
                                "Faridabad",
                                "Fatehabad",
                                "Gurgaon",
                                "Hisar",
                                "Jhajjar",
                                "Jind",
                                "Kaithal",
                                "Karnal",
                                "Kurukshetra",
                                "Mahendragarh",
                                "Mewat",
                                "Palwal",
                                "Panchkula",
                                "Panipat",
                                "Rewari",
                                "Rohtak",
                                "Sirsa",
                                "Sonipat",
                                "Yamunanagar",
                            ],
                        },
                        {
                            name: "Himachal Pradesh",
                            districts: [
                                "Bilaspur",
                                "Chamba",
                                "Hamirpur",
                                "Kangra",
                                "Kinnaur",
                                "Kullu",
                                "Lahaul &amp; Spiti",
                                "Mandi",
                                "Shimla",
                                "Sirmaur (Sirmour)",
                                "Solan",
                                "Una",
                            ],
                        },
                        {
                            name: "Jammu and Kashmir",
                            districts: [
                                "Anantnag",
                                "Bandipore",
                                "Baramulla",
                                "Budgam",
                                "Doda",
                                "Ganderbal",
                                "Jammu",
                                "Kargil",
                                "Kathua",
                                "Kishtwar",
                                "Kulgam",
                                "Kupwara",
                                "Leh",
                                "Poonch",
                                "Pulwama",
                                "Rajouri",
                                "Ramban",
                                "Reasi",
                                "Samba",
                                "Shopian",
                                "Srinagar",
                                "Udhampur",
                            ],
                        },
                        {
                            name: "Jharkhand",
                            districts: [
                                "Bokaro",
                                "Chatra",
                                "Deoghar",
                                "Dhanbad",
                                "Dumka",
                                "East Singhbhum",
                                "Garhwa",
                                "Giridih",
                                "Godda",
                                "Gumla",
                                "Hazaribag",
                                "Jamtara",
                                "Khunti",
                                "Koderma",
                                "Latehar",
                                "Lohardaga",
                                "Pakur",
                                "Palamu",
                                "Ramgarh",
                                "Ranchi",
                                "Sahibganj",
                                "Seraikela-Kharsawan",
                                "Simdega",
                                "West Singhbhum",
                            ],
                        },
                        {
                            name: "Karnataka",
                            districts: [
                                "Bagalkot",
                                "Ballari (Bellary)",
                                "Belagavi (Belgaum)",
                                "Bengaluru (Bangalore) Rural",
                                "Bengaluru (Bangalore) Urban",
                                "Bidar",
                                "Chamarajanagar",
                                "Chikballapur",
                                "Chikkamagaluru (Chikmagalur)",
                                "Chitradurga",
                                "Dakshina Kannada",
                                "Davangere",
                                "Dharwad",
                                "Gadag",
                                "Hassan",
                                "Haveri",
                                "Kalaburagi (Gulbarga)",
                                "Kodagu",
                                "Kolar",
                                "Koppal",
                                "Mandya",
                                "Mysuru (Mysore)",
                                "Raichur",
                                "Ramanagara",
                                "Shivamogga (Shimoga)",
                                "Tumakuru (Tumkur)",
                                "Udupi",
                                "Uttara Kannada (Karwar)",
                                "Vijayapura (Bijapur)",
                                "Yadgir",
                            ],
                        },
                        {
                            name: "Kerala",
                            districts: [
                                "Alappuzha",
                                "Ernakulam",
                                "Idukki",
                                "Kannur",
                                "Kasaragod",
                                "Kollam",
                                "Kottayam",
                                "Kozhikode",
                                "Malappuram",
                                "Palakkad",
                                "Pathanamthitta",
                                "Thiruvananthapuram",
                                "Thrissur",
                                "Wayanad",
                            ],
                        },
                        {
                            name: "Lakshadweep (UT)",
                            districts: [
                                "Agatti",
                                "Amini",
                                "Androth",
                                "Bithra",
                                "Chethlath",
                                "Kavaratti",
                                "Kadmath",
                                "Kalpeni",
                                "Kilthan",
                                "Minicoy",
                            ],
                        },
                        {
                            name: "Madhya Pradesh",
                            districts: [
                                "Agar Malwa",
                                "Alirajpur",
                                "Anuppur",
                                "Ashoknagar",
                                "Balaghat",
                                "Barwani",
                                "Betul",
                                "Bhind",
                                "Bhopal",
                                "Burhanpur",
                                "Chhatarpur",
                                "Chhindwara",
                                "Damoh",
                                "Datia",
                                "Dewas",
                                "Dhar",
                                "Dindori",
                                "Guna",
                                "Gwalior",
                                "Harda",
                                "Hoshangabad",
                                "Indore",
                                "Jabalpur",
                                "Jhabua",
                                "Katni",
                                "Khandwa",
                                "Khargone",
                                "Mandla",
                                "Mandsaur",
                                "Morena",
                                "Narsinghpur",
                                "Neemuch",
                                "Panna",
                                "Raisen",
                                "Rajgarh",
                                "Ratlam",
                                "Rewa",
                                "Sagar",
                                "Satna",
                                "Sehore",
                                "Seoni",
                                "Shahdol",
                                "Shajapur",
                                "Sheopur",
                                "Shivpuri",
                                "Sidhi",
                                "Singrauli",
                                "Tikamgarh",
                                "Ujjain",
                                "Umaria",
                                "Vidisha",
                            ],
                        },
                        {
                            name: "Maharashtra",
                            districts: [
                                "Ahmednagar",
                                "Akola",
                                "Amravati",
                                "Aurangabad",
                                "Beed",
                                "Bhandara",
                                "Buldhana",
                                "Chandrapur",
                                "Dhule",
                                "Gadchiroli",
                                "Gondia",
                                "Hingoli",
                                "Jalgaon",
                                "Jalna",
                                "Kolhapur",
                                "Latur",
                                "Mumbai City",
                                "Mumbai Suburban",
                                "Nagpur",
                                "Nanded",
                                "Nandurbar",
                                "Nashik",
                                "Osmanabad",
                                "Palghar",
                                "Parbhani",
                                "Pune",
                                "Raigad",
                                "Ratnagiri",
                                "Sangli",
                                "Satara",
                                "Sindhudurg",
                                "Solapur",
                                "Thane",
                                "Wardha",
                                "Washim",
                                "Yavatmal",
                            ],
                        },
                        {
                            name: "Manipur",
                            districts: [
                                "Bishnupur",
                                "Chandel",
                                "Churachandpur",
                                "Imphal East",
                                "Imphal West",
                                "Jiribam",
                                "Kakching",
                                "Kamjong",
                                "Kangpokpi",
                                "Noney",
                                "Pherzawl",
                                "Senapati",
                                "Tamenglong",
                                "Tengnoupal",
                                "Thoubal",
                                "Ukhrul",
                            ],
                        },
                        {
                            name: "Meghalaya",
                            districts: [
                                "East Garo Hills",
                                "East Jaintia Hills",
                                "East Khasi Hills",
                                "North Garo Hills",
                                "Ri Bhoi",
                                "South Garo Hills",
                                "South West Garo Hills ",
                                "South West Khasi Hills",
                                "West Garo Hills",
                                "West Jaintia Hills",
                                "West Khasi Hills",
                            ],
                        },
                        {
                            name: "Mizoram",
                            districts: [
                                "Aizawl",
                                "Champhai",
                                "Kolasib",
                                "Lawngtlai",
                                "Lunglei",
                                "Mamit",
                                "Saiha",
                                "Serchhip",
                            ],
                        },
                        {
                            name: "Nagaland",
                            districts: [
                                "Dimapur",
                                "Kiphire",
                                "Kohima",
                                "Longleng",
                                "Mokokchung",
                                "Mon",
                                "Peren",
                                "Phek",
                                "Tuensang",
                                "Wokha",
                                "Zunheboto",
                            ],
                        },
                        {
                            name: "Odisha",
                            districts: [
                                "Angul",
                                "Balangir",
                                "Balasore",
                                "Bargarh",
                                "Bhadrak",
                                "Boudh",
                                "Cuttack",
                                "Deogarh",
                                "Dhenkanal",
                                "Gajapati",
                                "Ganjam",
                                "Jagatsinghapur",
                                "Jajpur",
                                "Jharsuguda",
                                "Kalahandi",
                                "Kandhamal",
                                "Kendrapara",
                                "Kendujhar (Keonjhar)",
                                "Khordha",
                                "Koraput",
                                "Malkangiri",
                                "Mayurbhanj",
                                "Nabarangpur",
                                "Nayagarh",
                                "Nuapada",
                                "Puri",
                                "Rayagada",
                                "Sambalpur",
                                "Sonepur",
                                "Sundargarh",
                            ],
                        },
                        {
                            name: "Puducherry (UT)",
                            districts: ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
                        },
                        {
                            name: "Punjab",
                            districts: [
                                "Amritsar",
                                "Barnala",
                                "Bathinda",
                                "Faridkot",
                                "Fatehgarh Sahib",
                                "Fazilka",
                                "Ferozepur",
                                "Gurdaspur",
                                "Hoshiarpur",
                                "Jalandhar",
                                "Kapurthala",
                                "Ludhiana",
                                "Mansa",
                                "Moga",
                                "Muktsar",
                                "Nawanshahr (Shahid Bhagat Singh Nagar)",
                                "Pathankot",
                                "Patiala",
                                "Rupnagar",
                                "Sahibzada Ajit Singh Nagar (Mohali)",
                                "Sangrur",
                                "Tarn Taran",
                            ],
                        },
                        {
                            name: "Rajasthan",
                            districts: [
                                "Ajmer",
                                "Alwar",
                                "Banswara",
                                "Baran",
                                "Barmer",
                                "Bharatpur",
                                "Bhilwara",
                                "Bikaner",
                                "Bundi",
                                "Chittorgarh",
                                "Churu",
                                "Dausa",
                                "Dholpur",
                                "Dungarpur",
                                "Hanumangarh",
                                "Jaipur",
                                "Jaisalmer",
                                "Jalore",
                                "Jhalawar",
                                "Jhunjhunu",
                                "Jodhpur",
                                "Karauli",
                                "Kota",
                                "Nagaur",
                                "Pali",
                                "Pratapgarh",
                                "Rajsamand",
                                "Sawai Madhopur",
                                "Sikar",
                                "Sirohi",
                                "Sri Ganganagar",
                                "Tonk",
                                "Udaipur",
                            ],
                        },
                        {
                            name: "Sikkim",
                            districts: [
                                "East Sikkim",
                                "North Sikkim",
                                "South Sikkim",
                                "West Sikkim",
                            ],
                        },
                        {
                            name: "Tamil Nadu",
                            districts: [
                                "Ariyalur",
                                "Chennai",
                                "Coimbatore",
                                "Cuddalore",
                                "Dharmapuri",
                                "Dindigul",
                                "Erode",
                                "Kanchipuram",
                                "Kanyakumari",
                                "Karur",
                                "Krishnagiri",
                                "Madurai",
                                "Nagapattinam",
                                "Namakkal",
                                "Nilgiris",
                                "Perambalur",
                                "Pudukkottai",
                                "Ramanathapuram",
                                "Salem",
                                "Sivaganga",
                                "Thanjavur",
                                "Theni",
                                "Thoothukudi (Tuticorin)",
                                "Tiruchirappalli",
                                "Tirunelveli",
                                "Tiruppur",
                                "Tiruvallur",
                                "Tiruvannamalai",
                                "Tiruvarur",
                                "Vellore",
                                "Viluppuram",
                                "Virudhunagar",
                            ],
                        },
                        {
                            name: "Telangana",
                            districts: [
                                "Adilabad",
                                "Bhadradri Kothagudem",
                                "Hyderabad",
                                "Jagtial",
                                "Jangaon",
                                "Jayashankar Bhoopalpally",
                                "Jogulamba Gadwal",
                                "Kamareddy",
                                "Karimnagar",
                                "Khammam",
                                "Komaram Bheem Asifabad",
                                "Mahabubabad",
                                "Mahabubnagar",
                                "Mancherial",
                                "Medak",
                                "Medchal",
                                "Nagarkurnool",
                                "Nalgonda",
                                "Nirmal",
                                "Nizamabad",
                                "Peddapalli",
                                "Rajanna Sircilla",
                                "Rangareddy",
                                "Sangareddy",
                                "Siddipet",
                                "Suryapet",
                                "Vikarabad",
                                "Wanaparthy",
                                "Warangal (Rural)",
                                "Warangal (Urban)",
                                "Yadadri Bhuvanagiri",
                            ],
                        },
                        {
                            name: "Tripura",
                            districts: [
                                "Dhalai",
                                "Gomati",
                                "Khowai",
                                "North Tripura",
                                "Sepahijala",
                                "South Tripura",
                                "Unakoti",
                                "West Tripura",
                            ],
                        },
                        {
                            name: "Uttarakhand",
                            districts: [
                                "Almora",
                                "Bageshwar",
                                "Chamoli",
                                "Champawat",
                                "Dehradun",
                                "Haridwar",
                                "Nainital",
                                "Pauri Garhwal",
                                "Pithoragarh",
                                "Rudraprayag",
                                "Tehri Garhwal",
                                "Udham Singh Nagar",
                                "Uttarkashi",
                            ],
                        },
                        {
                            name: "Uttar Pradesh",
                            districts: [
                                "Agra",
                                "Aligarh",
                                "Allahabad",
                                "Ambedkar Nagar",
                                "Amethi (Chatrapati Sahuji Mahraj Nagar)",
                                "Amroha (J.P. Nagar)",
                                "Auraiya",
                                "Azamgarh",
                                "Baghpat",
                                "Bahraich",
                                "Ballia",
                                "Balrampur",
                                "Banda",
                                "Barabanki",
                                "Bareilly",
                                "Basti",
                                "Bhadohi",
                                "Bijnor",
                                "Budaun",
                                "Bulandshahr",
                                "Chandauli",
                                "Chitrakoot",
                                "Deoria",
                                "Etah",
                                "Etawah",
                                "Faizabad",
                                "Farrukhabad",
                                "Fatehpur",
                                "Firozabad",
                                "Gautam Buddha Nagar",
                                "Ghaziabad",
                                "Ghazipur",
                                "Gonda",
                                "Gorakhpur",
                                "Hamirpur",
                                "Hapur (Panchsheel Nagar)",
                                "Hardoi",
                                "Hathras",
                                "Jalaun",
                                "Jaunpur",
                                "Jhansi",
                                "Kannauj",
                                "Kanpur Dehat",
                                "Kanpur Nagar",
                                "Kanshiram Nagar (Kasganj)",
                                "Kaushambi",
                                "Kushinagar (Padrauna)",
                                "Lakhimpur - Kheri",
                                "Lalitpur",
                                "Lucknow",
                                "Maharajganj",
                                "Mahoba",
                                "Mainpuri",
                                "Mathura",
                                "Mau",
                                "Meerut",
                                "Mirzapur",
                                "Moradabad",
                                "Muzaffarnagar",
                                "Pilibhit",
                                "Pratapgarh",
                                "RaeBareli",
                                "Rampur",
                                "Saharanpur",
                                "Sambhal (Bhim Nagar)",
                                "Sant Kabir Nagar",
                                "Shahjahanpur",
                                "Shamali (Prabuddh Nagar)",
                                "Shravasti",
                                "Siddharth Nagar",
                                "Sitapur",
                                "Sonbhadra",
                                "Sultanpur",
                                "Unnao",
                                "Varanasi",
                            ],
                        },
                        {
                            name: "West Bengal",
                            districts: [
                                "Alipurduar",
                                "Bankura",
                                "Birbhum",
                                "Burdwan (Bardhaman)",
                                "Cooch Behar",
                                "Dakshin Dinajpur (South Dinajpur)",
                                "Darjeeling",
                                "Hooghly",
                                "Howrah",
                                "Jalpaiguri",
                                "Kalimpong",
                                "Kolkata",
                                "Malda",
                                "Murshidabad",
                                "Nadia",
                                "North 24 Parganas",
                                "Paschim Medinipur (West Medinipur)",
                                "Purba Medinipur (East Medinipur)",
                                "Purulia",
                                "South 24 Parganas",
                                "Uttar Dinajpur (North Dinajpur)",
                            ],
                        },
                    ],
                    branchList: [
                        {
                            branchName: "Bellandur",
                            branchId: "426",
                            Address: "Block No 12, Lower Ground Flr Bellandur",
                            district: "Bengaluru (Bangalore) Urban",
                            branchCity: "Bengaluru",
                            branchState: "Karnataka",
                            branchPinCode: "560037",
                            branchCountry: "India",
                        },
                        {
                            branchName: "Bellandur",
                            branchId: "427",
                            Address: "No 7, Vivekananda layout, Munnekola, Marathalli",
                            district: "Bengaluru (Bangalore) Urban",
                            branchCity: "Bengaluru",
                            branchState: "Karnataka",
                            branchPinCode: "560037",
                            branchCountry: "India",
                        },
                        {
                            branchName: "Andheri",
                            branchId: "658",
                            Address: "joint circle, Link road, Andheri",
                            district: "Mumbai City",
                            branchCity: "Mumbai",
                            branchState: "Maharashtra",
                            branchPinCode: "400058",
                            branchCountry: "India",
                        },
                    ],
                    userAnswer: {
                        branchName: "Bellandur",
                        branchId: "425",
                        Address: "No 7, Vivekananda layout, Munnekola, Marathalli",
                        district: "Bengaluru (Bangalore) Urban",
                        branchCity: "Bengaluru",
                        branchState: "Karnataka",
                        branchPinCode: "560037",
                        branchCountry: "India",
                        accVariant: "Savings-Basic"
                    }
                },
            },
            header: {
                channelId: "GPAY",
                requestId: "0150-09-10-2022 06:45:48.194-EntityDetailsCapture",
                journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
                journeyName: "CA",
                txnDtTm: "2022-10-09T06:45:26.683743",
                actionType: "EntityDetailsCapture",
                transactionStatus: "Success",
                serviceName: "Notification",
                journeyKey: "1123456948",
            },
            error: {
                xcptnInfo: {
                    ustrd: [],
                    strd: [],
                },
            },
        };
    } else {
        entitydetails = {
            header: {
                channelId: "GPAY",
                requestId: "0094-09-10-2022 06:46:04.720-BranchDetailsCapture",
                journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
                journeyName: "CA",
                txnDtTm: "2022-10-09T06:45:26.683743",
                actionType: "BranchDetailsCapture",
                transactionStatus: "Success",
                serviceName: "Notification",
                journeyKey: "1123456948",
            },
            data: {
                ResMessage: "Branch details has been captured successfully",
                businessTransactionStatus: "COMPLETED",
            },
            error: {
                xcptnInfo: {
                    ustrd: [],
                    strd: [],
                },
            },
        };
    }
    res.send(JSON.stringify(entitydetails));
});

router.post("/uploadDocumentRequest", (req, res) => {
    const uploadDocumentRequest = {
        data: { 
            dateOfIncorporation: "18/08/2017",
            docGSTValid: "Y",
            errorCode: "00",
            firmName: "B.A. Trading Company",
            gstinNumber: "27AABPB4536B1ZE",
            firmAddress: "nment of IndiaForm GST REG-06 [See Rule 10(1)] Registration Certificate",
            errorMsg: "Success",
        },
        header: {
            channelId: "GPAY",
            requestId: "0966-09-10-2022 06:45:24.495-PANValidation",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:45:26.683743",
            actionType: "PANValidation",
            transactionStatus: "Success",
            journeyKey: "1123456948",
            serviceName: "Notification",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(uploadDocumentRequest));
});

router.post("/aadharGenerateOtp", (req, res) => {
    const aadharGenerateOtp = {
        header: {
            channelId: "GPAY",
            requestId: "0024-09-10-2022 06:46:18.892-AadhaarOTPGeneration",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:46:22.909227",
            actionType: "AadhaarOTPGeneration",
            transactionStatus: "Success",
            serviceName: "Notification",
            journeyKey: "1123456948",
        },
        data: {
            ResMessage: "Aadhar OTP Generated and sent to customer's mobileNo",
            businessTransactionStatus: "COMPLETED",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(aadharGenerateOtp));
});
router.post("/aadharValidateOtp", (req, res) => {
    const aadharValidateOtp = {
        data: {
            ResMessage: "Aadhaar OTP Validated Successfully",
            firstName: "",
            lastName: "",
            middleName: "",
            gender: "",
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            city: "",
            state: "",
            businessTransactionStatus: "COMPLETED",
            AusQandA: {
                "Marital Status": {
                    properties: {
                        type: "DropDown",
                        isMandatory: true,
                        showDefault: "Married",
                        keyword: "ausMaritalStatus",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Married",
                        },
                        {
                            option: "UnMarried",
                        },
                    ],
                },
                "Spouse Name": {
                    properties: {
                        type: "InputBox",
                        isMandatory: true,
                        keyword: "ausSpouseName",
                        showDefault: "",
                    },
                    values: null,
                },
                "Fathers Name": {
                    properties: {
                        type: "InputBox",
                        isMandatory: true,
                        keyword: "ausFatherName",
                        showDefault: "",
                    },
                    values: null,
                },
                "Mother's Maiden": {
                    properties: {
                        type: "InputBox",
                        isMandatory: true,
                        keyword: "ausMotherMaidenName",
                        showDefault: "",
                    },
                    values: null,
                },
                "Is your address of residence same as firm's Registered Address?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "isAusMailaddEqualRegAdd",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                        },
                        {
                            option: "No",
                            errorMessage: "Please Accept the undertaking and proceed.",
                        },
                    ],
                },
                "Is your residence address same as aadhaar address?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "No",
                        keyword: "isAusMailaddEqualAddharAdd",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                            errorMessage: "Please Accept the undertaking and proceed.",
                        },
                        {
                            option: "No",
                        },
                    ],
                },
                "Do you want to add nominee for your account?": {
                    properties: {
                        type: "RadioButton",
                        isMandatory: true,
                        showDefault: "No",
                        keyword: "isNomRequired",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Yes",
                            children: {
                                "Nominee Name": {
                                    properties: {
                                        type: "InputBox",
                                        isMandatory: true,
                                        keyword: "nomName",
                                        showDefault: "",
                                    },
                                    values: null,
                                },
                                "Select DOB of Nominee": {
                                    properties: {
                                        type: "InputBox_Date",
                                        isMandatory: true,
                                        keyword: "nomDOB",
                                        showDefault: "",
                                    },
                                    values: null,
                                },
                                "Select Relation of nominee with you": {
                                    properties: {
                                        type: "DropDown",
                                        isMandatory: true,
                                        showDefault: "Daughter",
                                        keyword: "nomRelWithProp",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "Daughter",
                                        },
                                        {
                                            option: "Son",
                                        },
                                        {
                                            option: "Spouse",
                                        },
                                        {
                                            option: "Father",
                                        },
                                        {
                                            option: "Mother",
                                        },
                                    ],
                                },
                                "Is nominee Address same as your Residence address?": {
                                    properties: {
                                        type: "RadioButton",
                                        isMandatory: true,
                                        showDefault: "No",
                                        keyword: "isNomAddEqualEntityAdd",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "Yes",
                                        },
                                        {
                                            option: "No",
                                            children: {
                                                "Address line 1": {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomAddLine1",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                "Address line 2": {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomAddLine2",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                "Address line 3": {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomAddLine3",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                City: {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomCity",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                State: {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomState",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                Country: {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomCountry",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                "PIN Code": {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomPinCode",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                            },
                                        },
                                    ],
                                },
                                "Is Nominee Minor?": {
                                    properties: {
                                        type: "RadioButton",
                                        isMandatory: true,
                                        showDefault: "No",
                                        keyword: "isNomMinor",
                                    },
                                    userAnswer: "",
                                    values: [
                                        {
                                            option: "Yes",
                                            children: {
                                                "Guardian Name": {
                                                    properties: {
                                                        type: "InputBox",
                                                        isMandatory: true,
                                                        keyword: "nomGuardianName",
                                                        showDefault: "",
                                                    },
                                                    values: null,
                                                },
                                                "Guardian Relation with nominee": {
                                                    properties: {
                                                        type: "DropDown",
                                                        isMandatory: true,
                                                        showDefault: "Daughter",
                                                        keyword: "nomGuardianRelWithProp",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Daughter",
                                                        },
                                                        {
                                                            option: "Son",
                                                        },
                                                    ],
                                                },
                                                "Is guardian Address same as your Residence address?": {
                                                    properties: {
                                                        type: "RadioButton",
                                                        isMandatory: true,
                                                        showDefault: "No",
                                                        keyword: "isGuardianAddEqualAusAddress",
                                                    },
                                                    userAnswer: "",
                                                    values: [
                                                        {
                                                            option: "Yes",
                                                        },
                                                        {
                                                            option: "No",
                                                            children: {
                                                                "Is guardian Address same as your Nominee address?":
                                                                {
                                                                    properties: {
                                                                        type: "RadioButton",
                                                                        isMandatory: true,
                                                                        showDefault: "No",
                                                                        keyword: "isGuardianAddEqualNomAddrs",
                                                                    },
                                                                    userAnswer: "",
                                                                    values: [
                                                                        {
                                                                            option: "Yes",
                                                                        },
                                                                        {
                                                                            option: "No",
                                                                            children: {
                                                                                "Address line 1": {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarAddLine1",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                                "Address line 2": {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarAddLine2",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                                "Address line 3": {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarAddLine3",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                                City: {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarCity",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                                State: {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarState",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                                Country: {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarCountry",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                                "PIN Code": {
                                                                                    properties: {
                                                                                        type: "InputBox",
                                                                                        isMandatory: true,
                                                                                        keyword: "guarPinCode",
                                                                                        showDefault: "",
                                                                                    },
                                                                                    values: null,
                                                                                },
                                                                            },
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        },
                                        {
                                            option: "No",
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            option: "No",
                            errorMessage: "Please Accept the undertaking and proceed.",
                        },
                    ],
                },
                "I wish to avail below Channel Services": {
                    properties: {
                        type: "CheckBox",
                        isMandatory: true,
                        showDefault: "Yes",
                        keyword: "channelActivation",
                    },
                    userAnswer: "",
                    values: [
                        {
                            option: "Enet Banking",
                        },
                        {
                            option: "Mobile Banking",
                        },
                        {
                            option: "ECMS",
                        },
                        {
                            option: "Debit Card",
                        },
                    ],
                },
            },
        },
        header: {
            channelId: "GPAY",
            requestId: "0806-09-10-2022 06:46:58.100-AadhaarOTPValidation",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:46:58.803724",
            actionType: "AadhaarOTPValidation",
            transactionStatus: "Success",
            serviceName: "Notification",
            journeyKey: "1123456948",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(aadharValidateOtp));
});
router.post("/ausdetails", (req, res) => {
    const ausdetails = {
        header: {
            channelId: "GPAY",
            requestId: "0507-09-10-2022 06:47:19.660-AUSDetailsCapture",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:46:58.803724",
            actionType: "AUSDetailsCapture",
            transactionStatus: "Success",
            journeyKey: "1123456948",
            serviceName: "Notification",
        },
        data: {
            ResMessage: "AUS details has been captured successfully",
            businessTransactionStatus: "COMPLETED",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(ausdetails));
});
router.post("/accountGenerateOTP", (req, res) => {
    const accountGenerateOTP = {
        header: {
            channelId: "GPAY",
            requestId: "0147-09-10-2022 06:47:35.368-AccOpeningOTPGeneration",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:46:58.803724",
            actionType: "AccOpeningOTPGeneration",
            transactionStatus: "Success",
            journeyKey: "1123456948",
            serviceName: "Notification",
            journeySeq: "",
        },
        data: {
            ResMessage:
                "Account  Opening OTP Generated and sent to customer's mobileNo",
            mobileNo: "2222222216",
            otpGenTime: "",
            otpExpiryTime: "",
            businessTransactionStatus: "COMPLETED",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(accountGenerateOTP));
});
router.post("/accountVerifyOTP", (req, res) => {
    const accountVerifyOTP = {
        header: {
            channelId: "GPAY",
            requestId: "0129-09-10-2022 06:47:53.966-AccOpeningOTPValidation",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:46:58.803724",
            actionType: "AccOpeningOTPValidation",
            transactionStatus: "Success",
            journeyKey: "1123456948",
            serviceName: "Notification",
        },
        data: {
            ResMessage: "Account Opening OTP Validated Successfully",
            businessTransactionStatus: "COMPLETED",
            mobileNo: "1123456948",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(accountVerifyOTP));
});
router.post("/accountOpenning", (req, res) => {
    const accountOpenning = {
        header: {
            channelId: "GPAY",
            requestId: "0129-09-10-2022 06:47:53.966-AccOpeningOTPValidation",
            journeyId: "0508-09-10-2022 06:43:58.024-GPAY-CA-1123456948",
            journeyName: "CA",
            txnDtTm: "2022-10-09T06:46:58.803724",
            actionType: "AccOpeningOTPValidation",
            transactionStatus: "Success",
            journeyKey: "1123456948",
            serviceName: "Notification",
        },
        data: {
            ResMessage: "Account Opened Successfully",
            businessTransactionStatus: "COMPLETED",
            mobileNo: "1123456948",
            accountNo: "500112223459123",
        },
        error: {
            xcptnInfo: {
                ustrd: [],
                strd: [],
            },
        },
    };
    res.send(JSON.stringify(accountOpenning));
});

module.exports = router;
