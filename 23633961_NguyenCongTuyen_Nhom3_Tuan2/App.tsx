// import { useMemo, useState } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Alert,
// } from 'react-native';

// import { Course, courses } from './src/data/courses';

// const PAGE_SIZE = 4;

// type SortOrder = 'none' | 'asc' | 'desc';

// export default function App() {
//   const [query, setQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('Tất cả');
//   const [sortOrder, setSortOrder] = useState<SortOrder>('none');

//   const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const categories = useMemo(() => {
//     const uniqueCategories = Array.from(
//       new Set(courses.map((course) => course.category)),
//     );

//     return ['Tất cả', ...uniqueCategories];
//   }, []);

//   const filteredCourses = useMemo(() => {
//     const normalizedQuery = query
//       .trim()
//       .toLocaleLowerCase('vi');

//     let result = courses.filter((course) => {
//       const matchesQuery = `${course.title} ${course.instructor} ${course.category}`
//         .toLocaleLowerCase('vi')
//         .includes(normalizedQuery);

//       const matchesCategory =
//         selectedCategory === 'Tất cả' ||
//         course.category === selectedCategory;

//       return matchesQuery && matchesCategory;
//     });

//     if (sortOrder === 'asc') {
//       result = [...result].sort(
//         (a, b) => a.students - b.students,
//       );
//     }

//     if (sortOrder === 'desc') {
//       result = [...result].sort(
//         (a, b) => b.students - a.students,
//       );
//     }

//     return result;
//   }, [query, selectedCategory, sortOrder]);

//   const visibleCourses = useMemo(() => {
//     return filteredCourses.slice(0, visibleCount);
//   }, [filteredCourses, visibleCount]);

//   const openCourse = (course: Course) => {
//     Alert.alert(
//       course.title,
//       `Giảng viên: ${course.instructor}\nSố sinh viên: ${course.students}`,
//     );
//   };

//   const clearSearch = () => {
//     setQuery('');
//     setVisibleCount(PAGE_SIZE);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setVisibleCount(PAGE_SIZE);
//   };

//   const handleSortChange = () => {
//     setVisibleCount(PAGE_SIZE);

//     if (sortOrder === 'none') {
//       setSortOrder('asc');
//     } else if (sortOrder === 'asc') {
//       setSortOrder('desc');
//     } else {
//       setSortOrder('none');
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);

//     setTimeout(() => {
//       setVisibleCount(PAGE_SIZE);
//       setRefreshing(false);
//     }, 1000);
//   };

//   const handleLoadMore = () => {
//     if (loadingMore) {
//       return;
//     }

//     if (visibleCount >= filteredCourses.length) {
//       return;
//     }

//     setLoadingMore(true);

//     setTimeout(() => {
//       setVisibleCount((current) =>
//         Math.min(
//           current + PAGE_SIZE,
//           filteredCourses.length,
//         ),
//       );

//       setLoadingMore(false);
//     }, 1000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <CourseListScreen
//         coursesData={visibleCourses}
//         totalCourses={filteredCourses.length}
//         categories={categories}
//         query={query}
//         selectedCategory={selectedCategory}
//         sortOrder={sortOrder}
//         refreshing={refreshing}
//         loadingMore={loadingMore}
//         hasMore={visibleCount < filteredCourses.length}
//         onQueryChange={(text) => {
//           setQuery(text);
//           setVisibleCount(PAGE_SIZE);
//         }}
//         onClearSearch={clearSearch}
//         onCategoryChange={handleCategoryChange}
//         onSortChange={handleSortChange}
//         onRefresh={handleRefresh}
//         onLoadMore={handleLoadMore}
//         onCoursePress={openCourse}
//       />
//     </SafeAreaView>
//   );
// }

// interface CourseListScreenProps {
//   coursesData: Course[];
//   totalCourses: number;
//   categories: string[];
//   query: string;
//   selectedCategory: string;
//   sortOrder: SortOrder;
//   refreshing: boolean;
//   loadingMore: boolean;
//   hasMore: boolean;

//   onQueryChange: (text: string) => void;
//   onClearSearch: () => void;
//   onCategoryChange: (category: string) => void;
//   onSortChange: () => void;
//   onRefresh: () => void;
//   onLoadMore: () => void;
//   onCoursePress: (course: Course) => void;
// }

// function CourseListScreen({
//   coursesData,
//   totalCourses,
//   categories,
//   query,
//   selectedCategory,
//   sortOrder,
//   refreshing,
//   loadingMore,
//   hasMore,

//   onQueryChange,
//   onClearSearch,
//   onCategoryChange,
//   onSortChange,
//   onRefresh,
//   onLoadMore,
//   onCoursePress,
// }: CourseListScreenProps) {
//   return (
//     <FlatList
//       data={coursesData}
//       keyExtractor={(item) => item.id}
//       numColumns={2}
//       columnWrapperStyle={styles.columnWrapper}

//       renderItem={({ item }) => (
//         <CourseRow
//           course={item}
//           onPress={onCoursePress}
//         />
//       )}

//       ListHeaderComponent={
//         <View style={styles.header}>
//           <Text style={styles.screenTitle}>
//             Course Catalog
//           </Text>

//           <Text style={styles.subtitle}>
//             Khám phá các khóa học đang mở
//           </Text>

//           <View style={styles.searchContainer}>
//             <TextInput
//               value={query}
//               onChangeText={onQueryChange}
//               placeholder="Tìm theo tên, giảng viên hoặc danh mục"
//               placeholderTextColor="#8A8F98"
//               returnKeyType="search"
//               style={styles.searchInput}
//             />

//             {query.length > 0 && (
//               <Pressable
//                 onPress={onClearSearch}
//                 style={styles.clearButton}
//               >
//                 <Text style={styles.clearButtonText}>
//                   x
//                 </Text>
//               </Pressable>
//             )}
//           </View>

//           <Text style={styles.sectionTitle}>
//             Danh mục
//           </Text>

//           <FlatList
//             horizontal
//             data={categories}
//             keyExtractor={(item) => item}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.categoryList}
//             renderItem={({ item }) => (
//               <Pressable
//                 onPress={() => onCategoryChange(item)}
//                 style={[
//                   styles.categoryButton,
//                   selectedCategory === item &&
//                     styles.categoryButtonActive,
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.categoryButtonText,
//                     selectedCategory === item &&
//                       styles.categoryButtonTextActive,
//                   ]}
//                 >
//                   {item}
//                 </Text>
//               </Pressable>
//             )}
//           />

//           <View style={styles.sortRow}>
//             <Text style={styles.resultText}>
//               Tìm thấy {totalCourses} khóa học
//             </Text>

//             <Pressable
//               onPress={onSortChange}
//               style={styles.sortButton}
//             >
//               <Text style={styles.sortButtonText}>
//                 {sortOrder === 'none'
//                   ? 'Sắp xếp'
//                   : sortOrder === 'asc'
//                     ? 'SV ↑'
//                     : 'SV ↓'}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       }

//       ListEmptyComponent={
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyTitle}>
//             Không tìm thấy khóa học
//           </Text>

//           <Text style={styles.emptyText}>
//             Hãy thử tìm kiếm bằng một từ khóa khác.
//           </Text>
//         </View>
//       }

//       ListFooterComponent={
//         <View style={styles.footer}>
//           {loadingMore && (
//             <>
//               <ActivityIndicator size="small" />

//               <Text style={styles.footerText}>
//                 Đang tải thêm khóa học...
//               </Text>
//             </>
//           )}

//           {!loadingMore && !hasMore && coursesData.length > 0 && (
//             <Text style={styles.footerText}>
//               Đã hiển thị tất cả khóa học
//             </Text>
//           )}
//         </View>
//       }
//       refreshing={refreshing}
//       onRefresh={onRefresh}
//       onEndReached={onLoadMore}
//       onEndReachedThreshold={0.5}

//       contentContainerStyle={styles.listContent}
//     />
//   );
// }

// interface CourseRowProps {
//   course: Course;
//   onPress: (course: Course) => void;
// }

// function CourseRow({
//   course,
//   onPress,
// }: CourseRowProps) {
//   return (
//     <Pressable
//       onPress={() => onPress(course)}
//       style={({ pressed }) => [
//         styles.courseCard,
//         pressed && styles.courseCardPressed,
//       ]}
//     >
//       <Text style={styles.courseTitle}>
//         {course.title}
//       </Text>

//       <Text style={styles.instructor}>
//         Giảng viên: {course.instructor}
//       </Text>

//       <View style={styles.courseFooter}>
//         <Text style={styles.category}>
//           {course.category}
//         </Text>

//         <Text style={styles.studentCount}>
//           {course.students} SV
//         </Text>
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F6FA',
//   },

//   listContent: {
//     flexGrow: 1,
//     padding: 20,
//   },

//   header: {
//     marginBottom: 20,
//   },

//   screenTitle: {
//     color: '#182035',
//     fontSize: 32,
//     fontWeight: '800',
//   },

//   subtitle: {
//     color: '#697080',
//     fontSize: 15,
//     marginTop: 6,
//     marginBottom: 20,
//   },

//   searchContainer: {
//     position: 'relative',
//     justifyContent: 'center',
//   },

//   searchInput: {
//     minHeight: 52,
//     color: '#182035',
//     fontSize: 16,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#DDE1E8',
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     paddingRight: 50,
//   },

//   clearButton: {
//     position: 'absolute',
//     right: 10,
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#E8EBF0',
//   },

//   clearButtonText: {
//     color: '#4E5665',
//     fontSize: 24,
//     lineHeight: 26,
//     fontWeight: '500',
//   },

//   sectionTitle: {
//     color: '#182035',
//     fontSize: 16,
//     fontWeight: '700',
//     marginTop: 20,
//     marginBottom: 10,
//   },

//   categoryList: {
//     gap: 8,
//   },

//   categoryButton: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#DDE1E8',
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//   },

//   categoryButtonActive: {
//     backgroundColor: '#3157A4',
//     borderColor: '#3157A4',
//   },

//   categoryButtonText: {
//     color: '#596171',
//     fontSize: 13,
//     fontWeight: '600',
//   },

//   categoryButtonTextActive: {
//     color: '#FFFFFF',
//   },

//   sortRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 16,
//   },

//   resultText: {
//     color: '#4E5665',
//     fontSize: 14,
//     fontWeight: '600',
//   },

//   sortButton: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#DDE1E8',
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },

//   sortButtonText: {
//     color: '#3157A4',
//     fontSize: 13,
//     fontWeight: '700',
//   },

//   columnWrapper: {
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },

//   courseCard: {
//     width: '48%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E1E5EC',
//   },

//   courseCardPressed: {
//     opacity: 0.7,
//     transform: [{ scale: 0.98 }],
//   },

//   courseTitle: {
//     color: '#182035',
//     fontSize: 17,
//     fontWeight: '700',
//   },

//   instructor: {
//     color: '#686F7D',
//     fontSize: 13,
//     marginTop: 7,
//   },

//   courseFooter: {
//     marginTop: 16,
//   },

//   category: {
//     alignSelf: 'flex-start',
//     overflow: 'hidden',
//     color: '#3157A4',
//     fontSize: 11,
//     fontWeight: '700',
//     backgroundColor: '#E8F0FF',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//   },

//   studentCount: {
//     color: '#596171',
//     fontSize: 12,
//     marginTop: 8,
//   },

//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 250,
//     paddingHorizontal: 24,
//   },

//   emptyTitle: {
//     color: '#182035',
//     fontSize: 19,
//     fontWeight: '700',
//   },

//   emptyText: {
//     color: '#747B88',
//     fontSize: 14,
//     textAlign: 'center',
//     marginTop: 8,
//   },

//   footer: {
//     minHeight: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 15,
//   },

//   footerText: {
//     color: '#747B88',
//     fontSize: 13,
//     marginTop: 6,
//   },
// });

import { useMemo, useState } from "react";

import {
  Alert,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Student, StudentSection, studentSections } from "./src/data/students";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StudentDirectoryScreen />
    </SafeAreaView>
  );
}

interface StudentRowProps {
  student: Student;
  onPress: (student: Student) => void;
}

function StudentRow({ student, onPress }: StudentRowProps) {
  const isActive = student.status === "Đang học";

  return (
    <Pressable
      onPress={() => onPress(student)}
      style={({ pressed }) => [
        styles.studentCard,
        pressed && styles.studentCardPressed,
      ]}
    >
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(student.fullName)}</Text>
      </View>

      {/* Thông tin sinh viên */}
      <View style={styles.studentContent}>
        <Text style={styles.studentName}>{student.fullName}</Text>

        <Text style={styles.studentMeta}>
          {student.studentId} · {student.className}
        </Text>
      </View>

      {/* Trạng thái */}
      <View
        style={[
          styles.statusBadge,
          isActive ? styles.activeBadge : styles.pausedBadge,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            isActive ? styles.activeText : styles.pausedText,
          ]}
        >
          {student.status}
        </Text>
      </View>
    </Pressable>
  );
}

/* =========================================================
   LẤY CHỮ CÁI ĐẦU
========================================================= */

function getInitials(fullName: string) {
  const words = fullName.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

/* =========================================================
   STUDENT DIRECTORY
========================================================= */

function StudentDirectoryScreen() {
  /* =========================
     STATE
  ========================= */

  const [query, setQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "Tất cả" | "Đang học" | "Bảo lưu"
  >("Tất cả");

  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [groupByInitial, setGroupByInitial] = useState(false);

  /* =========================
     XÓA TÌM KIẾM
  ========================= */

  const clearSearch = () => {
    setQuery("");
  };

  /* =========================
     LỌC + SẮP XẾP
  ========================= */

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");

    let sections: StudentSection[] = studentSections.map((section) => {
      let data = section.data.filter((student) => {
        /* Tìm kiếm */
        const matchesQuery =
          !normalizedQuery ||
          `${student.fullName} ${student.studentId} ${student.className}`
            .toLocaleLowerCase("vi")
            .includes(normalizedQuery);

        /* Lọc trạng thái */
        const matchesStatus =
          statusFilter === "Tất cả" || student.status === statusFilter;

        return matchesQuery && matchesStatus;
      });

      /* =========================
           BÀI NÂNG CAO:
           SẮP XẾP SINH VIÊN
        ========================= */

      data = [...data].sort((a, b) =>
        a.fullName.localeCompare(b.fullName, "vi"),
      );

      return {
        ...section,
        data,
      };
    });

    /* =========================
       ẨN SECTION RỖNG
    ========================= */

    sections = sections.filter((section) => section.data.length > 0);

    return sections;
  }, [query, statusFilter]);

  /* =========================
     TỔNG SINH VIÊN
  ========================= */

  const totalStudents = filteredSections.reduce(
    (total, section) => total + section.data.length,
    0,
  );

  /* =========================
     THU GỌN / MỞ SECTION
  ========================= */

  const toggleSection = (title: string) => {
    setCollapsedSections((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  /* =========================
     ALERT SINH VIÊN
  ========================= */

  const openStudent = (student: Student) => {
    const message =
      `Mã sinh viên: ${student.studentId}\n` +
      `Lớp: ${student.className}\n` +
      `Trạng thái: ${student.status}`;

    /*
      Khi chạy Android / iOS:
      dùng Alert.alert()

      Khi chạy Web:
      dùng window.alert()
    */

    if (Platform.OS === "web") {
      window.alert(`${student.fullName}\n\n${message}`);
    } else {
      Alert.alert(student.fullName, message);
    }
  };

  /* =========================
     REFRESH
  ========================= */

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  /* =========================
     NHÓM THEO CHỮ CÁI ĐẦU
  ========================= */

  const initialSections = useMemo(() => {
    const map = new Map<string, Student[]>();

    filteredSections.forEach((section) => {
      section.data.forEach((student) => {
        const initial = student.fullName
          .trim()
          .charAt(0)
          .toLocaleUpperCase("vi");

        if (!map.has(initial)) {
          map.set(initial, []);
        }

        map.get(initial)!.push(student);
      });
    });

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b, "vi"))
      .map(([title, data]) => ({
        title,
        data,
      }));
  }, [filteredSections]);

  /* =========================
     SECTION ĐƯỢC HIỂN THỊ
  ========================= */

  const displaySections = groupByInitial ? initialSections : filteredSections;

  /* =========================
     SECTION HEADER
  ========================= */

  const renderSectionHeader = ({ section }: { section: StudentSection }) => {
    const isCollapsed = collapsedSections.includes(section.title);

    const sectionIndex = displaySections.findIndex(
      (item) => item.title === section.title,
    );

    let headerStyle = styles.sectionHeaderOne;

    if (sectionIndex % 3 === 1) {
      headerStyle = styles.sectionHeaderTwo;
    }

    if (sectionIndex % 3 === 2) {
      headerStyle = styles.sectionHeaderThree;
    }

    return (
      <Pressable
        onPress={() => {
          if (!groupByInitial) {
            toggleSection(section.title);
          }
        }}
        style={[styles.sectionHeader, headerStyle]}
      >
        <View>
          <Text style={styles.sectionTitle}>
            {groupByInitial ? `Nhóm ${section.title}` : section.title}
          </Text>

          <Text style={styles.sectionCount}>
            {section.data.length} sinh viên
          </Text>
        </View>

        {!groupByInitial && (
          <Text style={styles.collapseText}>{isCollapsed ? "＋" : "−"}</Text>
        )}
      </Pressable>
    );
  };

  /* =========================
     SECTION FOOTER
  ========================= */

  const renderSectionFooter = ({ section }: { section: StudentSection }) => {
    return (
      <View style={styles.sectionFooter}>
        <Text style={styles.sectionFooterText}>
          Tổng cộng: {section.data.length} sinh viên
        </Text>
      </View>
    );
  };

  /* =========================
     HEADER CỦA LIST
  ========================= */

  const listHeader = (
    <View style={styles.header}>
      {/* Tiêu đề */}

      <Text style={styles.screenTitle}>Student Directory</Text>

      <Text style={styles.subtitle}>Danh bạ sinh viên theo khoa</Text>

      {/* Tìm kiếm */}

      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm tên, mã sinh viên hoặc lớp"
          placeholderTextColor="#8A8F98"
          autoCorrect={false}
          style={styles.searchInput}
        />

        {/* NÚT XÓA */}

        {query.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Xóa</Text>
          </Pressable>
        )}
      </View>

      {/* Tổng kết quả */}

      <Text style={styles.resultText}>Tìm thấy {totalStudents} sinh viên</Text>

      {/* Bộ lọc trạng thái */}

      <Text style={styles.filterLabel}>Trạng thái</Text>

      <View style={styles.filterRow}>
        {(["Tất cả", "Đang học", "Bảo lưu"] as const).map((status) => (
          <Pressable
            key={status}
            onPress={() => setStatusFilter(status)}
            style={[
              styles.filterButton,
              statusFilter === status && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                statusFilter === status && styles.filterButtonTextActive,
              ]}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Đổi kiểu nhóm */}

      <Pressable
        onPress={() => setGroupByInitial((value) => !value)}
        style={styles.modeButton}
      >
        <Text style={styles.modeButtonText}>
          {groupByInitial ? "← Nhóm theo khoa" : "Nhóm theo chữ cái"}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SectionList
      sections={displaySections}
      keyExtractor={(item) => item.id}
      renderItem={({ item, section }) => {
        const isCollapsed =
          !groupByInitial && collapsedSections.includes(section.title);

        if (isCollapsed) {
          return null;
        }

        return <StudentRow student={item} onPress={openStudent} />;
      }}
      renderSectionHeader={renderSectionHeader}
      renderSectionFooter={renderSectionFooter}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Không tìm thấy sinh viên</Text>

          <Text style={styles.emptyText}>
            Không có sinh viên phù hợp với{" "}
            {query.trim() ? `"${query.trim()}".` : "bộ lọc hiện tại."}
          </Text>
        </View>
      }
      /* =====================
         KHOẢNG CÁCH SINH VIÊN
      ===================== */

      ItemSeparatorComponent={() => <View style={styles.separator} />}
      /* =====================
         KHOẢNG CÁCH SECTION
      ===================== */

      SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      /* Header section cố định */
      stickySectionHeadersEnabled={true}
      /* =====================
         PULL TO REFRESH
      ===================== */

      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.listContent}
    />
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  /* =========================
     CONTAINER
  ========================= */

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  listContent: {
    paddingBottom: 30,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    padding: 16,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 16,
  },

  /* =========================
     SEARCH
  ========================= */

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#D5D9E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFF",
  },

  clearButton: {
    marginLeft: 8,
    height: 45,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#555",
  },

  clearButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },

  resultText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },

  /* =========================
     FILTER
  ========================= */

  filterLabel: {
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "700",
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  filterButton: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D5D9E0",
  },

  filterButtonActive: {
    backgroundColor: "#333",
  },

  filterButtonText: {
    color: "#444",
  },

  filterButtonTextActive: {
    color: "#FFF",
    fontWeight: "600",
  },

  /* =========================
     MODE BUTTON
  ========================= */

  modeButton: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D5D9E0",
  },

  modeButtonText: {
    fontWeight: "600",
  },

  /* =========================
     SECTION HEADER
  ========================= */

  sectionHeader: {
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionHeaderOne: {
    backgroundColor: "#E3F2FD",
  },

  sectionHeaderTwo: {
    backgroundColor: "#E8F5E9",
  },

  sectionHeaderThree: {
    backgroundColor: "#FFF3E0",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  sectionCount: {
    marginTop: 3,
    fontSize: 13,
    color: "#666",
  },

  collapseText: {
    fontSize: 25,
    fontWeight: "600",
  },

  /* =========================
     STUDENT CARD
  ========================= */

  studentCard: {
    marginHorizontal: 16,
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  studentCardPressed: {
    opacity: 0.7,
  },

  /* =========================
     AVATAR
  ========================= */

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 15,
    fontWeight: "700",
  },

  /* =========================
     STUDENT INFO
  ========================= */

  studentContent: {
    flex: 1,
  },

  studentName: {
    fontSize: 16,
    fontWeight: "700",
  },

  studentMeta: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },

  /* =========================
     STATUS
  ========================= */

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
  },

  activeBadge: {
    backgroundColor: "#E8F5E9",
  },

  pausedBadge: {
    backgroundColor: "#FFF3E0",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  activeText: {
    color: "#2E7D32",
  },

  pausedText: {
    color: "#EF6C00",
  },

  /* =========================
     FOOTER
  ========================= */

  sectionFooter: {
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  sectionFooterText: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
  },

  /* =========================
     SEPARATOR
  ========================= */

  separator: {
    height: 8,
  },

  sectionSeparator: {
    height: 16,
  },

  /* =========================
     EMPTY
  ========================= */

  emptyContainer: {
    alignItems: "center",
    padding: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  emptyText: {
    color: "#666",
    textAlign: "center",
  },
});
