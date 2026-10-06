/**
 * UI string table for English and Bangla.
 * Add keys here as new UI sections are built.
 */
const strings = {
  en: {
    appTitle: 'Tender Package Builder',
    appSubtitle: 'Organize and compile tender document packages',
    langToggle: 'বাংলা',

    // Section headings
    sectionTenderInfo: 'Tender Information',
    sectionRequirements: 'Document Requirements',
    sectionUpload: 'Uploaded Documents',

    // Placeholders
    placeholderTenderInfo: 'Load a requirements JSON file to see tender details.',
    placeholderRequirements: 'Load a requirements JSON file to see the document checklist.',
    placeholderUpload: 'Uploaded documents will be listed here.',

    // Upload section
    sectionUpload: 'Upload PDF Documents',
    btnAddPdfs: 'Select PDF Files',
    uploadInstructions: 'Select one or more PDF files from your computer. All files stay in your browser.',
    uploadEmptyHint: 'No PDF files uploaded yet.',
    uploadStats: '{count} file(s) · {size} total',
    uploadLimitFiles: 'Maximum {max} files allowed. {rejected} file(s) were not added because the limit would be exceeded.',
    uploadLimitSize: 'Maximum total size is {maxMb} MB. {rejected} file(s) were not added because the size limit would be exceeded.',
    uploadNotPdf: '"{name}" is not a PDF file and was not added.',
    uploadDuplicate: '"{name}" has already been added and was skipped.',
    uploadParseFail: '"{name}" could not be read — the file may be damaged, encrypted, or not a valid PDF.',
    uploadBatchErrors: '{count} file(s) could not be added.',
    colFilename: 'File Name',
    colSize: 'Size',
    colPages: 'Pages',
    colActions: '',
    btnRemove: 'Remove',
    labelPages: 'pages',
    labelReading: 'Reading…',
    limitReachedFiles: 'File limit reached (30 files maximum). Remove a file to add another.',
    limitReachedSize: 'Size limit reached (50 MB maximum). Remove a file to add another.',

    // Requirements loader
    btnLoadJson: 'Load Requirements JSON',
    btnReloadJson: 'Replace / Reload JSON',
    loadInstructions: 'Select a requirements.json file from your computer. All processing happens in your browser.',
    loadedFile: 'Loaded file:',
    reqCount: 'requirements',

    // Tender info labels
    labelTenderId: 'Tender ID',
    labelTitle: 'Title',
    labelProcuringEntity: 'Procuring Entity',
    labelBidder: 'Bidder',
    labelDeadline: 'Submission Deadline',

    // Requirements table headers
    colOrder: '#',
    colDocument: 'Document',
    colMandatory: 'Required',
    colExpiry: 'Expiry Check',

    // Badges
    badgeMandatory: 'Mandatory',
    badgeOptional: 'Optional',
    badgeExpiryYes: 'Required',
    badgeExpiryNo: 'Not required',

    // Upload section
    sectionUpload: 'Upload PDF Documents',
    btnAddPdfs: 'Select PDF Files',
    uploadInstructions: 'Select one or more PDF files from your computer. All files stay in your browser.',
    uploadEmptyHint: 'No PDF files uploaded yet.',
    uploadStats: '{count} file(s) · {size} total',
    uploadLimitFiles: 'Maximum {max} files allowed. {rejected} file(s) were not added because the limit would be exceeded.',
    uploadLimitSize: 'Maximum total size is {maxMb} MB. {rejected} file(s) were not added because the size limit would be exceeded.',
    uploadNotPdf: '{name} is not a PDF file and was not added.',
    uploadDuplicate: '{name} has already been added and was skipped.',
    uploadParseFail: '{name} could not be read — the file may be damaged, encrypted, or not a valid PDF.',
    uploadBatchErrors: '{count} file(s) could not be added. See details above.',
    colFilename: 'File Name',
    colSize: 'Size',
    colPages: 'Pages',
    colActions: '',
    btnRemove: 'Remove',
    labelPages: 'pages',
    labelReading: 'Reading…',
    limitReachedFiles: 'File limit reached (30 files maximum). Remove a file to add another.',
    limitReachedSize: 'Size limit reached (50 MB maximum). Remove a file to add another.',

    // Validation errors
    errNotJson: 'The selected file is not valid JSON. Please check the file and try again.',
    errMissingTender: 'Invalid file structure: missing "tender" object.',
    errMissingTenderId: 'Invalid file structure: "tender" is missing "tender_id".',
    errMissingTitle: 'Invalid file structure: "tender" is missing "title".',
    errMissingProcuringEntity: 'Invalid file structure: "tender" is missing "procuring_entity".',
    errMissingBidder: 'Invalid file structure: "tender" is missing "bidder".',
    errMissingDeadline: 'Invalid file structure: "tender" is missing "submission_deadline".',
    errMissingRequirements: 'Invalid file structure: "requirements" array is missing or empty.',
    errRequirementField: 'Requirement at index {index} is missing field: "{field}".',
    errUnexpected: 'An unexpected error occurred while reading the file.',
  },

  bn: {
    appTitle: 'টেন্ডার প্যাকেজ বিল্ডার',
    appSubtitle: 'টেন্ডার ডকুমেন্ট প্যাকেজ সংগঠিত ও সংকলন করুন',
    langToggle: 'English',

    // Section headings
    sectionTenderInfo: 'টেন্ডার তথ্য',
    sectionRequirements: 'ডকুমেন্ট প্রয়োজনীয়তা',
    sectionUpload: 'আপলোড করা ডকুমেন্ট',

    // Placeholders
    placeholderTenderInfo: 'টেন্ডার বিবরণ দেখতে একটি requirements JSON ফাইল লোড করুন।',
    placeholderRequirements: 'ডকুমেন্ট চেকলিস্ট দেখতে একটি requirements JSON ফাইল লোড করুন।',
    placeholderUpload: 'আপলোড করা ডকুমেন্টগুলো এখানে তালিকাভুক্ত হবে।',

    // Upload section
    sectionUpload: 'PDF ডকুমেন্ট আপলোড করুন',
    btnAddPdfs: 'PDF ফাইল নির্বাচন করুন',
    uploadInstructions: 'আপনার কম্পিউটার থেকে এক বা একাধিক PDF ফাইল নির্বাচন করুন। সকল ফাইল আপনার ব্রাউজারেই থাকবে।',
    uploadEmptyHint: 'এখনো কোনো PDF ফাইল আপলোড হয়নি।',
    uploadStats: '{count}টি ফাইল · মোট {size}',
    uploadLimitFiles: 'সর্বোচ্চ {max}টি ফাইল অনুমোদিত। সীমা অতিক্রম করায় {rejected}টি ফাইল যোগ করা হয়নি।',
    uploadLimitSize: 'সর্বোচ্চ মোট আকার {maxMb} MB। আকার সীমা অতিক্রম করায় {rejected}টি ফাইল যোগ করা হয়নি।',
    uploadNotPdf: '{name} একটি PDF ফাইল নয়, তাই যোগ করা হয়নি।',
    uploadDuplicate: '{name} ইতিমধ্যে যোগ করা হয়েছে, তাই এড়িয়ে যাওয়া হয়েছে।',
    uploadParseFail: '{name} পড়া যায়নি — ফাইলটি ক্ষতিগ্রস্ত, এনক্রিপ্টেড বা সঠিক PDF নাও হতে পারে।',
    uploadBatchErrors: '{count}টি ফাইল যোগ করা যায়নি। উপরের বিবরণ দেখুন।',
    colFilename: 'ফাইলের নাম',
    colSize: 'আকার',
    colPages: 'পৃষ্ঠা',
    colActions: '',
    btnRemove: 'মুছুন',
    labelPages: 'পৃষ্ঠা',
    labelReading: 'পড়ছে…',
    limitReachedFiles: 'ফাইল সীমায় পৌঁছেছে (সর্বোচ্চ ৩০টি ফাইল)। নতুন ফাইল যোগ করতে একটি সরিয়ে দিন।',
    limitReachedSize: 'আকার সীমায় পৌঁছেছে (সর্বোচ্চ ৫০ MB)। নতুন ফাইল যোগ করতে একটি সরিয়ে দিন।',

    // Requirements loader
    btnLoadJson: 'Requirements JSON লোড করুন',
    btnReloadJson: 'JSON পরিবর্তন / পুনরায় লোড করুন',
    loadInstructions: 'আপনার কম্পিউটার থেকে requirements.json ফাইলটি নির্বাচন করুন। সকল প্রক্রিয়াকরণ আপনার ব্রাউজারেই হবে।',
    loadedFile: 'লোড করা ফাইল:',
    reqCount: 'টি ডকুমেন্ট প্রয়োজনীয়তা',

    // Tender info labels
    labelTenderId: 'টেন্ডার আইডি',
    labelTitle: 'শিরোনাম',
    labelProcuringEntity: 'ক্রয়কারী প্রতিষ্ঠান',
    labelBidder: 'দরদাতা',
    labelDeadline: 'দাখিলের শেষ তারিখ',

    // Requirements table headers
    colOrder: 'ক্র.',
    colDocument: 'ডকুমেন্ট',
    colMandatory: 'বাধ্যতামূলক',
    colExpiry: 'মেয়াদ যাচাই',

    // Badges
    badgeMandatory: 'বাধ্যতামূলক',
    badgeOptional: 'ঐচ্ছিক',
    badgeExpiryYes: 'প্রয়োজন',
    badgeExpiryNo: 'প্রয়োজন নেই',

    // Validation errors
    errNotJson: 'নির্বাচিত ফাইলটি সঠিক JSON নয়। ফাইলটি পরীক্ষা করে আবার চেষ্টা করুন।',
    errMissingTender: 'ফাইলের গঠন ত্রুটিপূর্ণ: "tender" অবজেক্ট পাওয়া যায়নি।',
    errMissingTenderId: 'ফাইলের গঠন ত্রুটিপূর্ণ: "tender"-এ "tender_id" নেই।',
    errMissingTitle: 'ফাইলের গঠন ত্রুটিপূর্ণ: "tender"-এ "title" নেই।',
    errMissingProcuringEntity: 'ফাইলের গঠন ত্রুটিপূর্ণ: "tender"-এ "procuring_entity" নেই।',
    errMissingBidder: 'ফাইলের গঠন ত্রুটিপূর্ণ: "tender"-এ "bidder" নেই।',
    errMissingDeadline: 'ফাইলের গঠন ত্রুটিপূর্ণ: "tender"-এ "submission_deadline" নেই।',
    errMissingRequirements: 'ফাইলের গঠন ত্রুটিপূর্ণ: "requirements" অ্যারে নেই অথবা খালি।',
    errRequirementField: '{index} নম্বর requirement-এ "{field}" ফিল্ড নেই।',
    errUnexpected: 'ফাইল পড়তে গিয়ে অপ্রত্যাশিত একটি ত্রুটি ঘটেছে।',
  },
}

export default strings
