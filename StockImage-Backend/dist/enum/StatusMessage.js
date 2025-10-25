export var StatusMessage;
(function (StatusMessage) {
    StatusMessage["SUCCESS"] = "Successfully completed ";
    StatusMessage["FAILURE"] = "Operation Failed";
    StatusMessage["UNAUTHORIZED"] = "Unauthorized access";
    StatusMessage["INVALID"] = "Invalid Token";
    StatusMessage["REFRESH_TOKEN_EXPIRED"] = "Refresh Token Expired";
    StatusMessage["LOGOUT_SUCCESS"] = "Logout Successfully";
    StatusMessage["INVALID_OLD_PASSWORD"] = "Invalid old password";
    StatusMessage["RESET_SUCCESS"] = "Reset password successfully";
    StatusMessage["INVALID_PASSWORD"] = "Invalid password";
})(StatusMessage || (StatusMessage = {}));
