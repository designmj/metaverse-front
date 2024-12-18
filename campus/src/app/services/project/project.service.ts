import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "src/app/models/common/api-response.interface";
import { ProjectDocResponseData } from "src/app/models/project/project_doc/project_doc-response.interface";
import { ProjectResponseData } from "src/app/models/project/projects/projects-response.interface";

@Injectable({
    providedIn: 'root',
})

export class ProjectService {
    private projectApiUrl = 'http://localhost:3000/projects';

    constructor(private http: HttpClient) {}

    // projects
    createProject(projectData: any): Observable<ApiResponse<ProjectResponseData>> {
        return this.http.post<ApiResponse<ProjectResponseData>>(`${this.projectApiUrl}/register`, projectData);
    }

    getAllProject(): Observable<ApiResponse<ProjectResponseData>> {
        return this.http.get<ApiResponse<ProjectResponseData>>(`${this.projectApiUrl}`);
    }

    updateProject(id: number, projectData: any): Observable<ApiResponse<ProjectResponseData>> {
        return this.http.patch<ApiResponse<ProjectResponseData>>(`${this.projectApiUrl}/${id}/update`, projectData);
    }
      
    deleteProject(id: number): Observable<ApiResponse<ProjectResponseData>> {
        return this.http.delete<ApiResponse<ProjectResponseData>>(`${this.projectApiUrl}/${id}/delete`);
    }

    // project_doc
    createProjectDoc(projectId: number, projectDocData: any): Observable<ApiResponse<ProjectDocResponseData>> {
        return this.http.post<ApiResponse<ProjectDocResponseData>>(`${this.projectApiUrl}/${projectId}/projectDocs/register`, projectDocData);
      }

    getAllProjectDoc(projectId: number): Observable<ApiResponse<ProjectDocResponseData>> {
        return this.http.get<ApiResponse<ProjectDocResponseData>>(`${this.projectApiUrl}/${projectId}/projectDocs`);
    }

    getOneProjectDoc(projectId: number, projectDocId: number): Observable<ApiResponse<ProjectDocResponseData>> {
        return this.http.get<ApiResponse<ProjectDocResponseData>>(`${this.projectApiUrl}/${projectId}/projectDocs/${projectDocId}/read`);
    }

    updateProjectDoc(projectId: number, projectDocId: number, projectDocData: any): Observable<ApiResponse<ProjectDocResponseData>> {
        return this.http.put<ApiResponse<ProjectDocResponseData>>(`${this.projectApiUrl}/${projectId}/projectDocs/${projectDocId}/update`, projectDocData);
    }
      
    deleteProjectDoc(projectId: number, projectDocId: number): Observable<ApiResponse<ProjectDocResponseData>> {
        return this.http.delete<ApiResponse<ProjectDocResponseData>>(`${this.projectApiUrl}/${projectId}/projectDocs/${projectDocId}/delete`);
    }
}