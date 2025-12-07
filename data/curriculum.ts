import { GradeLevel, TextbookSet } from "../types";

export const CURRICULUM: Record<GradeLevel, Record<TextbookSet, string[]>> = {
  [GradeLevel.GRADE_6]: {
    [TextbookSet.KET_NOI]: [
      "Chương I: Tập hợp các số tự nhiên",
      "Chương II: Tính chia hết trong tập hợp các số tự nhiên",
      "Chương III: Số nguyên",
      "Chương IV: Một số hình phẳng trong thực tiễn",
      "Chương V: Tính đối xứng của hình phẳng trong tự nhiên",
      "Chương VI: Phân số",
      "Chương VII: Số thập phân",
      "Chương VIII: Những hình học cơ bản",
      "Chương IX: Dữ liệu và xác suất thực nghiệm",
      "Ôn tập cuối học kì I",
      "Ôn tập cuối học kì II"
    ],
    [TextbookSet.CANH_DIEU]: [
      "Chương 1: Số tự nhiên",
      "Chương 2: Số nguyên",
      "Chương 3: Hình học trực quan",
      "Chương 4: Một số yếu tố thống kê và xác suất",
      "Chương 5: Phân số và số thập phân",
      "Chương 6: Hình học phẳng",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ],
    [TextbookSet.CHAN_TRO]: [
      "Chương 1: Số tự nhiên",
      "Chương 2: Số nguyên",
      "Chương 3: Hình học trực quan",
      "Chương 4: Một số yếu tố thống kê",
      "Chương 5: Phân số",
      "Chương 6: Số thập phân",
      "Chương 7: Tính đối xứng của hình phẳng",
      "Chương 8: Hình học phẳng",
      "Chương 9: Một số yếu tố xác suất",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ]
  },
  [GradeLevel.GRADE_7]: {
    [TextbookSet.KET_NOI]: [
      "Chương I: Số hữu tỉ",
      "Chương II: Số thực",
      "Chương III: Góc và đường thẳng song song",
      "Chương IV: Tam giác bằng nhau",
      "Chương V: Thu thập và biểu diễn dữ liệu",
      "Chương VI: Tỉ lệ thức và đại lượng tỉ lệ",
      "Chương VII: Biểu thức đại số và đa thức một biến",
      "Chương VIII: Làm quen với biến cố và xác suất của biến cố",
      "Chương IX: Quan hệ giữa các yếu tố trong một tam giác",
      "Chương X: Một số hình khối trong thực tiễn",
       "Ôn tập cuối học kì I",
       "Ôn tập cuối học kì II"
    ],
    [TextbookSet.CANH_DIEU]: [
      "Chương 1: Số hữu tỉ",
      "Chương 2: Số thực",
      "Chương 3: Hình học trực quan",
      "Chương 4: Góc. Đường thẳng song song",
      "Chương 5: Một số yếu tố thống kê và xác suất",
      "Chương 6: Biểu thức đại số",
      "Chương 7: Tam giác",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ],
    [TextbookSet.CHAN_TRO]: [
      "Chương 1: Số hữu tỉ",
      "Chương 2: Số thực",
      "Chương 3: Các hình khối trong thực tiễn",
      "Chương 4: Góc và đường thẳng song song",
      "Chương 5: Một số yếu tố thống kê",
      "Chương 6: Các đại lượng tỉ lệ",
      "Chương 7: Biểu thức đại số",
      "Chương 8: Tam giác",
      "Chương 9: Một số yếu tố xác suất",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ]
  },
  [GradeLevel.GRADE_8]: {
    [TextbookSet.KET_NOI]: [
      "Chương I: Đa thức",
      "Chương II: Hằng đẳng thức đáng nhớ và ứng dụng",
      "Chương III: Tứ giác",
      "Chương IV: Định lí Thalès",
      "Chương V: Dữ liệu và biểu đồ",
      "Chương VI: Phân thức đại số",
      "Chương VII: Phương trình bậc nhất và hàm số bậc nhất",
      "Chương VIII: Mở đầu về tính xác suất của biến cố",
      "Chương IX: Tam giác đồng dạng",
      "Chương X: Một số hình khối trong thực tiễn",
      "Ôn tập cuối học kì I",
      "Ôn tập cuối học kì II"
    ],
    [TextbookSet.CANH_DIEU]: [
      "Chương 1: Đa thức nhiều biến",
      "Chương 2: Phân thức đại số",
      "Chương 3: Hàm số và đồ thị",
      "Chương 4: Hình học trực quan",
      "Chương 5: Tam giác. Tứ giác",
      "Chương 6: Một số yếu tố thống kê và xác suất",
      "Chương 7: Phương trình bậc nhất một ẩn",
      "Chương 8: Tam giác đồng dạng. Hình đồng dạng",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ],
    [TextbookSet.CHAN_TRO]: [
      "Chương 1: Biểu thức đại số",
      "Chương 2: Các hình khối trong thực tiễn",
      "Chương 3: Định lí Pythagore. Tứ giác",
      "Chương 4: Một số yếu tố thống kê",
      "Chương 5: Hàm số và đồ thị",
      "Chương 6: Phương trình",
      "Chương 7: Định lí Thalès",
      "Chương 8: Hình đồng dạng",
      "Chương 9: Một số yếu tố xác suất",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ]
  },
  [GradeLevel.GRADE_9]: {
    [TextbookSet.KET_NOI]: [
      "Chương I: Hệ hai phương trình bậc nhất hai ẩn",
      "Chương II: Phương trình và bất phương trình bậc nhất một ẩn",
      "Chương III: Căn thức bậc hai và căn thức bậc ba",
      "Chương IV: Hệ thức lượng trong tam giác vuông",
      "Chương V: Đường tròn",
      "Chương VI: Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn",
      "Chương VII: Tần số và tần số tương đối",
      "Chương VIII: Xác suất của biến cố trong một số trò chơi đơn giản",
      "Chương IX: Đường tròn ngoại tiếp và đường tròn nội tiếp",
      "Chương X: Một số hình khối trong thực tiễn",
      "Ôn tập cuối học kì I",
      "Ôn tập cuối học kì II"
    ],
    [TextbookSet.CANH_DIEU]: [
      "Chương 1: Phương trình và hệ phương trình bậc nhất",
      "Chương 2: Bất phương trình bậc nhất một ẩn",
      "Chương 3: Căn thức",
      "Chương 4: Hệ thức lượng trong tam giác vuông",
      "Chương 5: Đường tròn",
      "Chương 6: Một số yếu tố thống kê và xác suất",
      "Chương 7: Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn",
      "Chương 8: Đường tròn ngoại tiếp và đường tròn nội tiếp",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ],
    [TextbookSet.CHAN_TRO]: [
      "Chương 1: Phương trình và hệ phương trình",
      "Chương 2: Bất phương trình bậc nhất một ẩn",
      "Chương 3: Căn thức",
      "Chương 4: Hệ thức lượng trong tam giác vuông",
      "Chương 5: Đường tròn",
      "Chương 6: Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn",
      "Chương 7: Tần số và tần số tương đối",
      "Chương 8: Xác suất của biến cố",
      "Chương 9: Đường tròn ngoại tiếp và đường tròn nội tiếp",
      "Ôn tập cuối học kì 1",
      "Ôn tập cuối học kì 2"
    ]
  }
};