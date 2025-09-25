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
        this.elements.searchInput.addEventListener('input', Utils.debounce((e) => this.handleSearch(e.target.value), 250));
        this.elements.table.querySelector('thead').addEventListener('click', (e) => {
            const header = e.target.closest('th');
            if (header && header.dataset.sort) this.handleSort(header.dataset.sort);
        });
    },

    generateTableData() {
        this.state.tableData = this.SPECIAL_ANGLES[this.state.currentUnit].map(angle => {
            const angleRad = this.state.currentUnit === 'degrees' ? Utils.degToRad(angle) : angle;
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
                <td>${this.formatAngle(row.angle)}</td>
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

    handleSort(column) {
        if (this.state.sortColumn === column) {
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortColumn = column;
            this.state.sortDirection = 'asc';
        }
        this.sortData();
        this.renderTable();
    },

    sortData() {
        this.state.filteredData.sort((a, b) => {
            const valA = a[this.state.sortColumn];
            const valB = b[this.state.sortColumn];
            if (this.state.sortDirection === 'asc') {
                return valA > valB ? 1 : -1;
            } else {
                return valA < valB ? 1 : -1;
            }
        });
    },

    handleSearch(term) {
        const lowerTerm = term.toLowerCase();
        if (!lowerTerm) {
            this.state.filteredData = [...this.state.tableData];
        } else {
            this.state.filteredData = this.state.tableData.filter(row => {
                return Object.values(row).some(val => val.toString().toLowerCase().includes(lowerTerm));
            });
        }
        this.renderTable();
    },

    formatAngle(angle) {
        if (this.state.currentUnit === 'degrees') {
            return `${angle}°`;
        }

        const RADIAN_MAP = {
            0: '0',
            [Math.PI / 6]: 'π/6',
            [Math.PI / 4]: 'π/4',
            [Math.PI / 3]: 'π/3',
            [Math.PI / 2]: 'π/2',
            [2 * Math.PI / 3]: '2π/3',
            [3 * Math.PI / 4]: '3π/4',
            [5 * Math.PI / 6]: '5π/6',
            [Math.PI]: 'π',
            [7 * Math.PI / 6]: '7π/6',
            [5 * Math.PI / 4]: '5π/4',
            [4 * Math.PI / 3]: '4π/3',
            [3 * Math.PI / 2]: '3π/2',
            [5 * Math.PI / 3]: '5π/3',
            [7 * Math.PI / 4]: '7π/4',
            [11 * Math.PI / 6]: '11π/6',
            [2 * Math.PI]: '2π'
        };

        // Find the closest special angle within a small tolerance
        for (const key in RADIAN_MAP) {
            if (Math.abs(angle - key) < 1e-9) {
                return RADIAN_MAP[key];
            }
        }

        // Fallback for any other angle
        return `${Utils.formatNumber(angle / Math.PI, 2)}π`;
    },

    formatValue(func, value, angleRad) {
        if (this.state.currentFormat === 'exact' && this.EXACT_VALUES[func] && this.EXACT_VALUES[func][angleRad]) {
            return this.EXACT_VALUES[func][angleRad];
        }
        if (!isFinite(value)) return '∞';
        return Utils.formatNumber(value, 3);
    }
};
