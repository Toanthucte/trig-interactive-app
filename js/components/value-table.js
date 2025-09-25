import { debounce, degToRad, radToDeg, formatNumber, formatAngle } from '../utils.js';

/**
 * Value Table Component - Project V2
 * Author: NQQ
 * Created: 24/07/2024
 */

export const ValueTable = {
    isInitialized: false,
    elements: {},
    state: {
        currentUnit: 'degrees',
        currentFormat: 'exact',
        tableData: [],
        filteredData: [],
        sortColumn: 'angle',
        sortDirection: 'asc',
    },

    SPECIAL_ANGLES: {
        degrees: [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360],
        radians: [0, Math.PI/6, Math.PI/4, Math.PI/3, Math.PI/2, 2*Math.PI/3, 3*Math.PI/4, 5*Math.PI/6, Math.PI, 3*Math.PI/2, 2*Math.PI]
    },

    EXACT_VALUES: {
        sin: {
            0: '0',
            [Math.PI/6]: '1/2',
            [Math.PI/4]: '√2/2',
            [Math.PI/3]: '√3/2',
            [Math.PI/2]: '1',
            [2*Math.PI/3]: '√3/2',
            [3*Math.PI/4]: '√2/2',
            [5*Math.PI/6]: '1/2',
            [Math.PI]: '0',
            [7*Math.PI/6]: '-1/2',
            [5*Math.PI/4]: '-√2/2',
            [4*Math.PI/3]: '-√3/2',
            [3*Math.PI/2]: '-1',
            [5*Math.PI/3]: '-√3/2',
            [7*Math.PI/4]: '-√2/2',
            [11*Math.PI/6]: '-1/2',
            [2*Math.PI]: '0'
        },
        cos: {
            0: '1',
            [Math.PI/6]: '√3/2',
            [Math.PI/4]: '√2/2',
            [Math.PI/3]: '1/2',
            [Math.PI/2]: '0',
            [2*Math.PI/3]: '-1/2',
            [3*Math.PI/4]: '-√2/2',
            [5*Math.PI/6]: '-√3/2',
            [Math.PI]: '-1',
            [7*Math.PI/6]: '-√3/2',
            [5*Math.PI/4]: '-√2/2',
            [4*Math.PI/3]: '-1/2',
            [3*Math.PI/2]: '0',
            [5*Math.PI/3]: '1/2',
            [7*Math.PI/4]: '√2/2',
            [11*Math.PI/6]: '√3/2',
            [2*Math.PI]: '1'
        },
        tan: {
            0: '0',
            [Math.PI/6]: '√3/3',
            [Math.PI/4]: '1',
            [Math.PI/3]: '√3',
            [Math.PI/2]: '∞',
            [2*Math.PI/3]: '-√3',
            [3*Math.PI/4]: '-1',
            [5*Math.PI/6]: '-√3/3',
            [Math.PI]: '0',
            [7*Math.PI/6]: '√3/3',
            [5*Math.PI/4]: '1',
            [4*Math.PI/3]: '√3',
            [3*Math.PI/2]: '∞',
            [5*Math.PI/3]: '-√3',
            [7*Math.PI/4]: '-1',
            [11*Math.PI/6]: '-√3/3',
            [2*Math.PI]: '0'
        }
    },

    init(container) {
        if (this.isInitialized) return;
        console.log('ValueTable component initialized');
        this.render(container);
        this.cacheElements();
        this.addEventListeners();
        this.generateTableData();
        this.sortData();
        this.renderTable();
        this.isInitialized = true;
    },

    render(container) {
        container.innerHTML = `
            <div class="section-header">
                <h2>📊 Bảng Giá Trị Lượng Giác</h2>
                <p class="section-description">Tra cứu, sắp xếp và lọc các giá trị lượng giác đặc biệt.</p>
            </div>
            <div class="table-controls">
                <div class="control-group">
                    <label>Đơn vị:</label>
                    <div class="toggle-group unit-toggle">
                        <button class="toggle-btn active" data-unit="degrees">Độ (°)</button>
                        <button class="toggle-btn" data-unit="radians">Radian (rad)</button>
                    </div>
                </div>
                <div class="control-group">
                    <label>Định dạng:</label>
                    <div class="toggle-group value-format">
                        <button class="toggle-btn active" data-format="exact">Chính xác</button>
                        <button class="toggle-btn" data-format="decimal">Thập phân</button>
                    </div>
                </div>
                <div class="control-group search-group">
                    <label for="table-search">Tìm kiếm:</label>
                    <input type="text" id="table-search" class="search-input" placeholder="Nhập góc hoặc giá trị...">
                </div>
            </div>
            <div class="table-container">
                <table class="values-table">
                    <thead>
                        <tr>
                            <th data-sort="angle" class="sort-asc">Góc</th>
                            <th data-sort="sin">sin</th>
                            <th data-sort="cos">cos</th>
                            <th data-sort="tan">tan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Table rows will be rendered here -->
                    </tbody>
                </table>
            </div>
        `;
    },

    cacheElements() {
        const section = document.getElementById('value-table');
        this.elements = {
            section,
            table: section.querySelector('.values-table'),
            tbody: section.querySelector('tbody'),
            unitToggle: section.querySelector('.unit-toggle'),
            formatToggle: section.querySelector('.value-format'),
            searchInput: section.querySelector('#table-search'),
        };
    },

    addEventListeners() {
        this.elements.unitToggle.addEventListener('click', (e) => {
            if (e.target.matches('.toggle-btn')) this.handleUnitToggle(e.target.dataset.unit);
        });
        this.elements.formatToggle.addEventListener('click', (e) => {
            if (e.target.matches('.toggle-btn')) this.handleFormatToggle(e.target.dataset.format);
        });
        this.elements.searchInput.addEventListener('input', debounce((e) => this.handleSearch(e.target.value), 250));
        this.elements.table.querySelector('thead').addEventListener('click', (e) => {
            const header = e.target.closest('th');
            if (header && header.dataset.sort) this.handleSort(header.dataset.sort);
        });
    },

    generateTableData() {
        this.state.tableData = this.SPECIAL_ANGLES[this.state.currentUnit].map(angle => {
            const angleRad = this.state.currentUnit === 'degrees' ? degToRad(angle) : angle;
            return {
                angle,
                angleRad,
                sin: Math.sin(angleRad),
                cos: Math.cos(angleRad),
                tan: Math.tan(angleRad)
            };
        });
        this.state.filteredData = [...this.state.tableData];
    },

    renderTable() {
        this.elements.tbody.innerHTML = this.state.filteredData.map(row => `
            <tr>
                <td>${formatAngle(row.angle, this.state.currentUnit)}</td>
                <td>${this.formatValue('sin', row.sin, row.angleRad)}</td>
                <td>${this.formatValue('cos', row.cos, row.angleRad)}</td>
                <td>${this.formatValue('tan', row.tan, row.angleRad)}</td>
            </tr>
        `).join('');
    },

    handleUnitToggle(unit) {
        if (this.state.currentUnit === unit) return;
        this.state.currentUnit = unit;
        this.elements.unitToggle.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.unit === unit));
        this.generateTableData();
        this.sortData();
        this.renderTable();
    },

    handleFormatToggle(format) {
        if (this.state.currentFormat === format) return;
        this.state.currentFormat = format;
        this.elements.formatToggle.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.format === format));
        this.renderTable();
    },

    handleSearch(query) {
        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) {
            this.state.filteredData = [...this.state.tableData];
        } else {
            this.state.filteredData = this.state.tableData.filter(row => {
                const angleStr = formatAngle(row.angle, this.state.currentUnit).toLowerCase();
                const sinStr = this.formatValue('sin', row.sin, row.angleRad).toLowerCase();
                const cosStr = this.formatValue('cos', row.cos, row.angleRad).toLowerCase();
                const tanStr = this.formatValue('tan', row.tan, row.angleRad).toLowerCase();
                return angleStr.includes(lowerQuery) || sinStr.includes(lowerQuery) || cosStr.includes(lowerQuery) || tanStr.includes(lowerQuery);
            });
        }
        this.renderTable();
    },

    handleSort(column) {
        if (this.state.sortColumn === column) {
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortColumn = column;
            this.state.sortDirection = 'asc';
        }
        this.sortData();
        this.renderTable();
        this.updateSortHeaders();
    },

    sortData() {
        this.state.filteredData.sort((a, b) => {
            let valA, valB;
            if (this.state.sortColumn === 'angle') {
                valA = a.angle;
                valB = b.angle;
            } else {
                valA = a[this.state.sortColumn];
                valB = b[this.state.sortColumn];
            }

            if (valA < valB) return this.state.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return this.state.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    },

    updateSortHeaders() {
        this.elements.table.querySelectorAll('th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
            if (th.dataset.sort === this.state.sortColumn) {
                th.classList.add(this.state.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        });
    },

    formatValue(func, value, angleRad) {
        if (this.state.currentFormat === 'exact') {
            const exactVal = this.EXACT_VALUES[func][angleRad];
            if (exactVal !== undefined) return exactVal;
        }
        // Fallback to decimal if not a special angle or format is decimal
        if (Math.abs(value) > 1e6) return '∞'; // Handle tangent infinity
        return formatNumber(value, 3);
    },

    activate() {
        console.log('ValueTable component activated');
    }
};
