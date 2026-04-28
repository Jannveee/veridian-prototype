// Veridian Core Logic
// Backend-on-Frontend layer for sustainability-focused code auditing

/**
 * 1. The Audit Function
 * Simulates an AI analysis to scan input code for 'Carbon Leaks'.
 * Scans for:
 * - Infinite loops (e.g., while(true))
 * - Redundant API calls inside loops (e.g., fetch inside for/while)
 * - Inefficient O(n^2) sorting/loops (e.g., nested loops)
 * 
 * @param {string} code - The source code to audit.
 * @returns {Array} List of identified issues.
 */
export function runGreenAudit(code) {
  const issues = [];

  // Simple string and regex matching to simulate AST-based AI analysis
  
  // Detect infinite loops
  if (
    /while\s*$\s*(true|1)\s*$/i.test(code) ||
    /for\s*$\s*;\s*;\s*$/i.test(code) ||
    /do\s*\{[\s\S]*\}\s*while\s*$\s*(true|1)\s*$\s*;?/i.test(code) ||
    /while\s*(?:$\s*)?(true|1)(?:\s*$)?\s*:/i.test(code)
  ) {
    issues.push({
      id: 'infinite_loop',
      severity: 'high',
      message: 'Carbon Leak Detected: Infinite loop (while(true)) wastes significant CPU cycles.',
      penalty: 30
    });
  }

  // Detect fetch/API calls inside loops
  if (
    /(for|while)\s*[^{:]*[{:][\s\S]*?(fetch|axios|XMLHttpRequest|fetch_user|requests\.|httpx\.|urllib\.request|aiohttp|got|superagent|request)/i.test(code) ||
    /\.(forEach|map|filter|reduce)\s*\([\s\S]*?(fetch|axios|XMLHttpRequest|fetch_user|requests\.|httpx\.|urllib\.request|aiohttp|got|superagent|request)/i.test(code)
  ) {
     issues.push({
      id: 'redundant_api_calls',
      severity: 'high',
      message: 'Carbon Leak Detected: API request inside a loop can cause excessive network traffic and energy waste.',
      penalty: 25
    });
  }

  // Detect inefficient nested loops O(n^2)
  if (
    /(for|while)\s*$[^)]*$\s*\{[\s\S]*(for|while)\s*$[^)]*$\s*\{/i.test(code) ||
    /(for|while)\s+[^\n]*:\s*[\s\S]*?\n\s+(for|while)\s+[^\n]*:/i.test(code)
  ) {
    issues.push({
      id: 'inefficient_nested_loops',
      severity: 'medium',
      message: 'Carbon Leak Detected: O(n^2) nested loops found. Optimization recommended to reduce CPU load.',
      penalty: 15
    });
  }

  // Detect deep clone in loop
  if (/(for|while|forEach|map|filter|reduce)[\s\S]*JSON\.parse\(\s*JSON\.stringify\(/i.test(code)) {
    issues.push({
      id: 'expensive_deep_clone',
      severity: 'high',
      message: 'Carbon Leak Detected: Deep cloning via JSON.parse(JSON.stringify()) inside a loop is highly CPU-intensive. Consider structuredClone() or shallow copying.',
      penalty: 20
    });
  }

  // Detect unbounded array growth / memory leaks
  if (/(const|let|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*\[\];[\s\S]*function[\s\S]*\2\.push\(/i.test(code)) {
    issues.push({
      id: 'unbounded_global_array',
      severity: 'high',
      message: 'Carbon Leak Detected: Pushing to an array declared outside the function scope without clearing it leads to unbounded memory growth.',
      penalty: 25
    });
  }

  // Detect large array allocations without need
  if (
    /new\s+Array$\s*[0-9]{5,}\s*$/.test(code) ||
    /$$\s*0\s*$$\s*\*\s*[0-9]{5,}/.test(code) ||
    /range$\s*[0-9]{5,}\s*$/.test(code)
  ) {
    issues.push({
      id: 'large_memory_allocation',
      severity: 'medium',
      message: 'Carbon Leak Detected: Large immediate memory allocation. Consider streaming or pagination.',
      penalty: 10
    });
  }

  return issues;
}


/**
 * 2. The Sustainability Scorer
 * Returns a score from 0–100. High energy waste drops the score significantly.
 * 
 * @param {Array} issues - Evaluated issues from runGreenAudit.
 * @returns {number} Score from 0 to 100.
 */
export function calculateSustainability(issues) {
  let score = 100;
  
  issues.forEach(issue => {
    score -= issue.penalty;
  });

  return Math.max(0, score); // Ensure score doesn't drop below 0
}


/**
 * 3. Carbon Metrics Logic
 * Converts sustainability score into human-readable metrics.
 * 
 * @param {number} score - The sustainability score (0-100).
 * @returns {Object} Estimated savings and metrics.
 */
export function getCarbonStats(score) {
  // Mock mathematical models for conversions based on score improvements.
  // Assuming a baseline legacy codebase score of 30.
  const baselineScore = 30;
  const improvement = score - baselineScore; 
  
  if (score <= baselineScore) {
     return {
        co2SavedKg: "0.00",
        cpuCyclesReduced: "0%",
        energySaveKwh: "0.00",
        message: "Code is below baseline. Major refactor needed to achieve savings!"
     };
  }

  // Formulate metrics based on the improvement
  const co2SavedKg = (improvement * 0.15).toFixed(2); // e.g., 0.15 kg per point of score above baseline
  const cpuCyclesReduced = (improvement * 1.2).toFixed(1); // e.g., 1.2% per point
  const energySaveKwh = (improvement * 0.08).toFixed(2); // e.g., 0.08 kWh per day per point

  return {
    co2SavedKg: co2SavedKg,
    cpuCyclesReduced: `${cpuCyclesReduced}%`,
    energySaveKwh: `${energySaveKwh}`,
    message: "Savings based on optimizing away from baseline inefficiencies."
  };
}


/**
 * 4. Local Storage Persistence
 * Data structure matches: Filename, Date, Score, Carbon Leaks, CO2 Saved
 */
const AUDIT_STORAGE_KEY = 'veridian_audit_history';

/**
 * Saves audit result to browser LocalStorage.
 * Connect this to the "Save Report" or "Run Audit" UI Button.
 * 
 * @param {string} filename - Name of the file being audited.
 * @param {string} code - The source code to audit.
 * @returns {Object} The saved record.
 */
export function saveAuditToHistory(filename, code) {
  const issues = runGreenAudit(code);
  const score = calculateSustainability(issues);
  const stats = getCarbonStats(score);

  // Match the Audit History table columns
  const record = {
    id: Date.now(),
    filename: filename || 'unknown_script.js',
    date: new Date().toISOString(),
    score: score,
    carbonLeaks: issues.length,
    co2Saved: stats.co2SavedKg // matches $CO_2$ Saved
  };

  const currentHistory = getAuditHistory();
  currentHistory.unshift(record); // Add to beginning
  
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(currentHistory));
  } catch (error) {
    console.error("Failed to save audit history:", error);
  }

  return record;
}

/**
 * Retrieves audit history from LocalStorage.
 * Connect this to UI when rendering the Audit History table.
 * 
 * @returns {Array} Array of historical audit records.
 */
export function getAuditHistory() {
  try {
    const historyData = localStorage.getItem(AUDIT_STORAGE_KEY);
    return historyData ? JSON.parse(historyData) : [];
  } catch (error) {
    console.error("Failed to retrieve audit history:", error);
    return [];
  }
}


/**
 * 5. The Refactor Generator
 * Returns a mock "Optimized" version of the inefficient code.
 * Connect this to a "Fix Issues" or "Auto-Refactor" UI button.
 * 
 * @param {string} code - Inefficient code.
 * @returns {string} Suggeseted optimized code.
 */
export function suggestGreenRefactor(code) {
  let optimizedCode = code;
  let modificationsMade = false;

  // Fix infinite loops
  if (/while\s*$\s*true\s*$/i.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(
      /while\s*$\s*true\s*$/gi, 
      "let isRunning = true; // Use termination condition\nwhile(isRunning)"
    );
    modificationsMade = true;
  }
  if (/while\s*$\s*1\s*$/i.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(
      /while\s*$\s*1\s*$/gi,
      "let isRunning = true; // Use termination condition\nwhile(isRunning)"
    );
    modificationsMade = true;
  }
  if (/for\s*$\s*;\s*;\s*$/i.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(
      /for\s*$\s*;\s*;\s*$/gi,
      "let isRunning = true; // Use termination condition\nwhile(isRunning)"
    );
    modificationsMade = true;
  }
  if (/while\s+True\s*:/i.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(
      /while\s+True\s*:/gi, 
      "is_running = True # Use termination condition\nwhile is_running:"
    );
    modificationsMade = true;
  }
  if (/while\s+(?:$\s*)?1(?:\s*$)?\s*:/i.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(
      /while\s+(?:$\s*)?1(?:\s*$)?\s*:/gi,
      "is_running = True # Use termination condition\nwhile is_running:"
    );
    modificationsMade = true;
  }

  // Fix API call in loop (Mocking an extraction)
  if (
      /(for|while)\s*[^{:]*[{:][\s\S]*?(fetch|axios|XMLHttpRequest|fetch_user|requests\.|httpx\.|urllib\.request|aiohttp|got|superagent|request)/i.test(optimizedCode) ||
      /\.(forEach|map|filter|reduce)\s*\([\s\S]*?(fetch|axios|XMLHttpRequest|fetch_user|requests\.|httpx\.|urllib\.request|aiohttp|got|superagent|request)/i.test(optimizedCode)
    ) {
      optimizedCode += "\n\n// VERIDIAN SUGGESTION: Batch your API calls using Promise.all() or asyncio.gather() rather than fetching inside a loop.\n/* \nconst promises = items.map(item => fetch(url, item));\nconst results = await Promise.all(promises);\n*/";
      modificationsMade = true;
  }

  // Fix expensive deep clone
  if (/JSON\.parse$\s*JSON\.stringify\(([^)]+)$\)/gi.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(
      /JSON\.parse$\s*JSON\.stringify\(([^)]+)$\)/gi,
      "structuredClone($1) // Used structuredClone for better performance"
    );
    modificationsMade = true;
  }

  // Fix unbounded global array push (mock refactor)
  if (/(const|let|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*\[\];[\s\S]*function[\s\S]*\2\.push\(/i.test(optimizedCode)) {
    optimizedCode += "\n\n// VERIDIAN SUGGESTION: The array above grows unbounded. Consider clearing it (array.length = 0) after processing, or moving its declaration inside the function scope to prevent memory leaks.";
    modificationsMade = true;
  }

  // Remove exact duplicate push statements
  const pushRegex = /([ \t]*)([\w\.]+)\.push$\.\.\.([^)]+)$;\s*\n\s*\2\.push$\.\.\.\3$;/gi;
  if (pushRegex.test(optimizedCode)) {
    optimizedCode = optimizedCode.replace(pushRegex, "$1$2.push(...$3); // Removed duplicate push statement");
    modificationsMade = true;
  }

  if (!modificationsMade) {
    return "// VERIDIAN: No obvious structural anti-patterns found to auto-refactor.\n\n" + code;
  }

  return "/** \n * GREEN REFACTOR APPLIED\n * Reduced CPU cycles and network overhead.\n */\n\n" + optimizedCode;
}