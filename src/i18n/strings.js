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
