import fs from "fs";
import path from "path";
import { parseSchoolsCSV } from "../../utils/parseSchoolsCSV";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "schools_by_state.csv");
  const csvString = fs.readFileSync(filePath, "utf8");
  const schools = parseSchoolsCSV(csvString);
  return { props: { schools } };
}

export default function SchoolsPage({ schools }: { schools: any[] }) {
  return (
    <div style={{ padding: "2rem", background: "#171717", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ color: "#b3a369", marginBottom: "2rem" }}>Schools in Alabama & Georgia</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#222", borderRadius: "8px" }}>
        <thead>
          <tr>
            {schools.length > 0 && Object.keys(schools[0]).map(key => (
              <th key={key} style={{ padding: "0.8rem", color: "#b3a369", borderBottom: "1px solid #333" }}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schools.map((school, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #232323" }}>
              {Object.values(school).map((value, i) => (
                <td key={i} style={{ padding: "0.7rem", color: "#fff" }}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}