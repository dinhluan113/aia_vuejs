export function validPhone(value) {
    if (value == "")
        return true;
    var re = /^([0-9]{10})\b/;
    return re.test(value);
}