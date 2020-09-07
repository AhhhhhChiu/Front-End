const TEST_LIST = [2, 5, 1, 7, 4, 8, 3, 9, 6];

// 冒泡排序
// O(n^2)
function BubbleSort(list) {
    const length = list.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            // console.log(list[j], list[j + 1]);
            if (list[j] > list[j + 1]) {
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
            }
            // console.log(list);
        }
    }
    return list;
}

// 选择排序
// O(n^2)
function SelectSort(list) {
    const length = list.length;
    for (let i = 0; i < length - 1; i++) {
        // console.log(list);
        let indexOfMin = i;
        for (let j = i; j < length; j++) {
            // console.log("list[j]", list[j]);
            if (list[j] < list[indexOfMin]) {
                indexOfMin = j;
            }
        }
        // console.log("indexOfMin", indexOfMin);
        [list[i], list[indexOfMin]] = [list[indexOfMin], list[i]];
    }
    return list;
}

// 插入排序
// O(n^2)
function InsertSort(list) {
    const length = list.length;
    for (let i = 1; i < length; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (list[j] < list[j - 1]) {
                [list[j], list[j - 1]] = [list[j - 1], list[j]];
            }
        }
    }
    return list;
}

// 快速排序
// O(nlogn)
function QuickSort(list) {
    const length = list.length;
    // 递归出口
    // 数组长度为1或0直接返回
    if (length <= 1) {
        return list;
    }
    // 左边第一个为基准值
    const flag = list[0];
    // 左指针指向左边第二个
    let left = 1;
    // 右指针指向最后一个
    let right = length - 1;
    // 当还未相遇时一直继续
    while (left < right) {
        // 右边当前值比基准值大时一直向左移 直到找到比基准值小的
        while (left < right && list[right] > flag) {
            right--;
        }
        // 左边当前值比基准值小时一直向右移 直到找到比基准值大的
        while (left < right && list[left] <= flag) {
            left++;
        }
        // 当未相遇时交换 相遇的交换没有意义
        if (left < right) {
            [list[left], list[right]] = [list[right], list[left]];
        }
    }
    // 基准值比相遇位置的值大时则交换
    if (flag > list[left]) {
        [list[0], list[left]] = [list[left], list[0]];
    }
    // 递归左递归右
    return QuickSort(list.slice(0, left)).concat(
        QuickSort(list.slice(left, length))
    );
}

function main() {
    // console.log(BubbleSort(Array.prototype.concat([], TEST_LIST)));
    // console.log(SelectSort(Array.prototype.concat([], TEST_LIST)));
    // console.log(InsertSort(Array.prototype.concat([], TEST_LIST)));
    console.log(QuickSort(Array.prototype.concat([], TEST_LIST)));
}

main();
